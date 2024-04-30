const mongodb = require("mongodb");

let instance = null;

class DatabaseConnection {
    constructor() {
        this.url = null;
    }

    setUrl(url) {
        this.url = url;
    }

    async connect() {
        if(this.client) {
            return;
        }
        this.client = new mongodb.MongoClient(this.url);

        await this.client.connect();
    }



async createCustomer(email) {
  await this.connect();
  let db = this.client.db("Webshop");
  let customersCollection = db.collection("customers");


  let customer = await customersCollection.findOne({ _id: email });
  if (customer) {
    return customer._id;
  }

  
  let result = await customersCollection.insertOne({ _id: email });
  return result.insertedId;
}





async saveOrder(lineItems, customerEmail) {
  await this.connect();

  const db = this.client.db("Webshop");
  const ordersCollection = db.collection("orders");
  const lineItemsCollection = db.collection("lineItems");
  const customersCollection = db.collection("customers");


  let customer = await customersCollection.findOne({ _id: customerEmail });
  if (!customer) {
   
    const newCustomerResult = await customersCollection.insertOne({ _id: customerEmail });
    customer = { _id: customerEmail, ...newCustomerResult }; 
  }

  const totalPrice = await this.calculateTotalPrice(lineItems);

  
  const orderResult = await ordersCollection.insertOne({
    customer: customer._id,
    orderDate: new Date(),
    status: 'unpaid',
    totalPrice: totalPrice,
    paymentId: null
  });

  const orderId = orderResult.insertedId;


  const encodedLineItems = lineItems.map((lineItem) => ({
    amount: lineItem.amount,
    totalPrice: lineItem.totalPrice, 
    order: orderId,
    product: new mongodb.ObjectId(lineItem.product),
  }));


  await lineItemsCollection.insertMany(encodedLineItems);

  return orderId;
}


async calculateTotalPrice(lineItems) {
  let totalPrice = 0;
  let db = this.client.db("Webshop");
  let productsCollection = db.collection("products");

  for (const item of lineItems) {
      let product = await productsCollection.findOne({_id: new mongodb.ObjectId(item.product)});
      totalPrice += (product.price * item.amount);
  }

  return totalPrice;
}



    async createProduct() {
        await this.connect();

        let db = this.client.db("Webshop");
        let collection = db.collection("products");

        let result = await collection.insertOne({"status": "draft", "name": null, "description": null, "image": null, "amountInStock": 0, "price": 0, "category": null});

        return result.insertedId;
    }

    async updateProduct(id, productData) {
        await this.connect();

        let db = this.client.db("Webshop");
        let collection = db.collection("products");

        await collection.updateOne({"_id": new mongodb.ObjectId(id)}, {"$set": {
            "name": productData["name"],
            "price": productData["price"],
            "description": productData["description"],
            "amountInStock": productData["amountInStock"],
            "status": productData["status"],
            "category": productData["category"] ? new mongodb.ObjectId(productData["category"]) : null
        }});
    }

    async save(aCollection, aId, aData) {
      await this.connect();

      let db = this.client.db("Webshop");
      let collection = db.collection(aCollection);

      await collection.updateOne({"_id": aId}, {"$set": aData});
    }

    async getProducts() {
        await this.connect();

        let db = this.client.db("Webshop");
        let collection = db.collection("products");

        let pipeline = [
            {
              $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category",
              },
            },
            {
              $addFields: {
                category: {
                  $first: "$category",
                },
              },
            },
          ];

        let documents = collection.aggregate(pipeline);
        let returnArray = [];

        for await(let document of documents) {
            returnArray.push(document);
        }

        return returnArray;
    }

    async getProductsByCategory(categoryName) {
      const db = this.client.db("Webshop");
      const productsCollection = db.collection("products");
      const categoriesCollection = db.collection("categories");
      console.log("Category name from request:", categoryName);
      const category = await categoriesCollection.findOne({ name: categoryName });
      console.log("Category found in database:", category);
      if (!category) {
        
        return []; 
      }
  
      const products = await productsCollection.find({ category: category._id }).toArray();
      console.log("Products found:", products);
      return products;
    }

/*     async getFish() {
        await this.connect();

        let db = this.client.db("Webshop");
        let collection = db.collection("Fish");

        let pipeline = [
            {
              $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category",
              },
            },
            {
              $addFields: {
                category: {
                  $first: "$category",
                },
              },
            },
          ];

        let documents = collection.aggregate(pipeline);
        let returnArray = [];

        for await(let document of documents) {
            returnArray.push(document);
        }

        return returnArray;
    } */



    async getAllOrders() {
        await this.connect();

        let db = this.client.db("Webshop");
        let collection = db.collection("orders");

        let pipeline = [
            {
              $lookup: {
                from: "lineItems",
                localField: "_id",
                foreignField: "order",
                as: "lineItems",
                pipeline: [
                  {
                    $lookup: {
                      from: "products",
                      localField: "product",
                      foreignField: "_id",
                      as: "product",
                    },
                  },
                  {
                    $addFields: {
                      product: {
                        $first: "$product",
                      },
                    },
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "customers",
                localField: "customer",
                foreignField: "_id",
                as: "customer",
              },
            },
            {
              $addFields: {
                linkedCustmer: {
                  $first: "$customer",
                },
              },
            },
          ];

        let documents = collection.aggregate(pipeline);
        let returnArray = [];

        for await(let document of documents) {
            returnArray.push(document);
        }

        return returnArray;
    }

    async getCustomers() {
      await this.connect();
      const db = this.client.db("Webshop");
      const customersCollection = db.collection("customers");
      
      const customers = await customersCollection.find({}).toArray();
      
      return customers.map(customer => {
         
          return {
            id: customer._id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            address1: customer.address?.address1,
            address2: customer.address?.address2,
            zipcode: customer.address?.zipcode,
            city: customer.address?.city,
            country: customer.address?.country
          };
      });
  }
  

    async getActiveProducts() {
      await this.connect();
      let db = this.client.db("Webshop");
        let collection = db.collection("products");

       let products = await collection.find({status: "active"}).toArray();

       return products;
    }

    async completeOrder(id) {
      await this.connect();
      let db = this.client.db("Webshop");
      let collection = db.collection("orders");

      await collection.updateOne({"_id": new mongodb.ObjectId(id)}, {"$set": {"status": "paid"}});      
    }

    static getInstance() {
        if(instance === null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }
}

module.exports = DatabaseConnection;
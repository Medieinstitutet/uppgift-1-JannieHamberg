const mongodb = require("mongodb");
const { ObjectId } = require('mongodb');


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





async createProduct(productData) {
  await this.connect();
  let db = this.client.db("Webshop");
  let collection = db.collection("products");

  const category = productData.category ? new ObjectId(productData.category._id) : null;

  let product = {
      name: productData.name || '',
      price: productData.price || 0,
      description: productData.description || '',
      image: productData.image || '',
      amountInStock: productData.amountInStock || 0,
      status: productData.status || 'draft',
      category: category  
  };

  let result = await collection.insertOne(product);
  return result.insertedId;
}


    async updateProduct(id, productData) {
        await this.connect();

        let db = this.client.db("Webshop");
        let collection = db.collection("products");

        console.log("Updating product with ID:", id, "Data:", productData);

        await collection.updateOne({"_id": new mongodb.ObjectId(id)}, {"$set": {
            "name": productData["name"],
            "price": productData["price"],
            "description": productData["description"],
            "image": productData["image"],
            "amountInStock": productData["amountInStock"],
            "status": productData["status"],
            "category": productData["category"] ? (productData["category"]._id ? new mongodb.ObjectId(productData["category"]._id) : new mongodb.ObjectId(productData["category"])) : null
        }});
    }

    async save(aCollection, aId, aData) {
      await this.connect();

      let db = this.client.db("Webshop");
      let collection = db.collection(aCollection);

      await collection.updateOne({"_id": aId}, {"$set": aData});
    }

    async deleteProduct(productId) {
      await this.connect();
      const db = this.client.db("Webshop");
      const collection = db.collection("products");
      const result = await collection.deleteOne({ _id: new ObjectId(productId) });
      return result.deletedCount === 1; 
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

    async getCategories() {
      await this.connect();
      let db = this.client.db("Webshop");
      let collection = db.collection("categories");
      let categories = await collection.find({}).toArray();
      return categories;
  }
  

    async getProductsByCategoryName(categoryName) {
      const db = this.client.db("Webshop");
      const categoriesCollection = db.collection("categories");
      const productsCollection = db.collection("products");
  
      const parentCategory = await categoriesCollection.findOne({ name: categoryName });
      if (!parentCategory) {
          return []; 
      }

      const categoryData = await categoriesCollection.aggregate([
          {
              $match: { _id: parentCategory._id } 
          },
          {
              $graphLookup: {
                  from: "categories",
                  startWith: "$_id",
                  connectFromField: "_id",  
                  connectToField: "childOf",  
                  as: "subcategories"
              }
          },
          {
              $project: {
                  categoryIds: {
                      $concatArrays: [
                          ["$_id"], 
                          { $map: { input: "$subcategories", as: "subcat", in: "$$subcat._id" } }
                      ]
                  }
              }
          }
      ]).toArray();
  
      if (categoryData.length === 0 || !categoryData[0].categoryIds) {
          return [];
      }
      const categoryIds = categoryData[0].categoryIds;
 
      const products = await productsCollection.find({
          category: { $in: categoryIds }
      }).toArray();
  
      return products;
      }
  

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
let express = require("express");
const cors = require('cors');
let DatabaseConnection = require("./src/database/DatabaseConnection");

let url = 'mongodb://localhost:27017';

DatabaseConnection.getInstance().setUrl(url);
DatabaseConnection.getInstance().connect();

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/orders", async (req, res) => {
    
    let orders = await DatabaseConnection.getInstance().getAllOrders();
    res.json(orders);

    }
);

app.get("/products", async (req, res) => {

    let products = await DatabaseConnection.getInstance().getProducts();

    res.json(products);

    }
);


  app.get('/categories', async (req, res) => {
    try {
        let categories = await DatabaseConnection.getInstance().getCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching categories", error: error.message });
    }
});

    app.get('/products/category/:categoryId', async (req, res) => {
        try {
        const products = await DatabaseConnection.getInstance().sortByCategory(req.params.categoryId);
        res.json(products);
        } catch (error) {
        res.status(500).json({ message: 'Error fetching products by category', error });
        }
    });

    app.get('/products/by-category/:categoryName', async (req, res) => {
        try {
            const categoryName = req.params.categoryName;
            const products = await DatabaseConnection.getInstance().getProductsByCategoryName(categoryName);
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products by category', error });
        }
    });
    
  

  app.post("/create-order", async (req, res) => {
    try {
   
      let customerId = await DatabaseConnection.getInstance().createCustomer(req.body.email);
  
     
      let orderId = await DatabaseConnection.getInstance().saveOrder(req.body.lineItems, customerId);
  
      res.json({ "id": orderId });
    } catch (error) {
   
      res.status(500).json({ message: "An error occurred during order creation", error: error.message });
    }
  });

  app.get("/customers", async (req, res) => {
    try {
        const customers = await DatabaseConnection.getInstance().getCustomers();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching customers", error: error.message });
    }
});

  

app.post('/addproduct', async (req, res) => {
    try {
      const productData = req.body;
      const productId = await DatabaseConnection.getInstance().createProduct(productData);
      res.status(201).send({ _id: productId, ...productData });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create product', error: error.message });
    }
  });
  

app.put('/products/:id', async (req, res) => {
    try {
        await DatabaseConnection.getInstance().updateProduct(req.params.id, req.body);
        res.json({"id": req.params.id, "message": "Product updated successfully"});
    } catch (error) {
        res.status(500).json({"message": "Error updating product", error});
    }
});


app.get("/active-products", async (req, res) => {

    let products = await DatabaseConnection.getInstance().getActiveProducts();

    res.json(products);

    }
);



app.post("/complete-order/:id", async (req, res) => {

    //TODO: check if payment is done and then complete the order
    let isPayed = true; //TODO: DEBUG always true right now
    if(isPayed){
        //TODO: mark order as payed
        await DatabaseConnection.getInstance().completeOrder(req.params.id);
    }
    else {
        res.status(500).json({"message": "Payment not completed"});
    }
    res.json({"payed": isPayed});

    }
);


app.listen(3000);
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

app.get("/orders", async (request, response) => {
    
    let orders = await DatabaseConnection.getInstance().getAllOrders();
    response.json(orders);

    }
);

app.get("/products", async (request, response) => {

    let products = await DatabaseConnection.getInstance().getProducts();

    response.json(products);

    }
);


  app.get('/categories', async (request, response) => {
    try {
        let categories = await DatabaseConnection.getInstance().getCategories();
        response.json(categories);
    } catch (error) {
        response.status(500).json({ message: "An error occurred while fetching categories", error: error.message });
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
    
  

  app.post("/create-order", async (request, response) => {
    try {
   
      let customerId = await DatabaseConnection.getInstance().createCustomer(request.body.email);
  
     
      let orderId = await DatabaseConnection.getInstance().saveOrder(request.body.lineItems, customerId);
  
      response.json({ "id": orderId });
    } catch (error) {
   
      response.status(500).json({ message: "An error occurred during order creation", error: error.message });
    }
  });

  app.get("/customers", async (request, response) => {
    try {
        const customers = await DatabaseConnection.getInstance().getCustomers();
        response.json(customers);
    } catch (error) {
        response.status(500).json({ message: "An error occurred while fetching customers", error: error.message });
    }
});

  

app.post("/products", async (request, response) => {
    
    let id = await DatabaseConnection.getInstance().createProduct();
    await DatabaseConnection.getInstance().updateProduct(id, request.body);

    response.json({"id": id});

});

app.put('/products/:id', async (request, response) => {
    try {
        await DatabaseConnection.getInstance().updateProduct(request.params.id, request.body);
        response.json({"id": request.params.id, "message": "Product updated successfully"});
    } catch (error) {
        response.status(500).json({"message": "Error updating product", error});
    }
});


app.get("/active-products", async (request, response) => {

    let products = await DatabaseConnection.getInstance().getActiveProducts();

    response.json(products);

    }
);



app.post("/complete-order/:id", async (request, response) => {

    //TODO: check if payment is done and then complete the order
    let isPayed = true; //TODO: DEBUG always true right now
    if(isPayed){
        //TODO: mark order as payed
        await DatabaseConnection.getInstance().completeOrder(request.params.id);
    }
    else {
        response.status(500).json({"message": "Payment not completed"});
    }
    response.json({"payed": isPayed});

    }
);


app.listen(3000);
let express = require("express");
const cors = require('cors');
let DatabaseConnection = require("./src/database/DatabaseConnection");
const { ObjectId } = require('mongodb');


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

app.get('/orders/:id', async (req, res) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid order ID format' });
    }

    try {
        console.log(`Fetching details for order ID: ${id}`); 
        const order = await DatabaseConnection.getInstance().getOrderDetails(id);
        console.log('Order details:', order); 

        if (!order || order.length === 0) {
            return res.status(404).send({ message: 'Order not found' });
        }

        res.json(order[0]);
    } catch (error) {
        console.error('Failed to fetch order details:', error);
        res.status(500).send({ message: 'Error fetching order details', error });
    }
});

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



app.post('/register-customer', async (req, res) => {
    try {
        const customerId = await DatabaseConnection.getInstance().registerCustomer(req.body);
        res.status(201).send({ message: 'Customer registered successfully', _id: customerId });
    } catch (error) {
        console.error('Error registering customer:', error);
        if (error.message.includes('duplicate key')) {
            res.status(409).send({ message: 'Email already registered', error: error.message });
        } else {
            res.status(500).send({ message: 'Failed to register customer', error: error.message });
        }
    }
});


app.post('/create-order', async (req, res) => {
    try {
        const orderId = await DatabaseConnection.getInstance().createOrder(req.body);
        await DatabaseConnection.getInstance().createLineItems(req.body.items, orderId);
        res.status(201).send({ message: 'Order and line items created successfully', orderId });
    } catch (error) {
        console.error('Error creating order or line items:', error);
        res.status(500).send({ message: 'Failed to create order', error: error.toString() });
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

  app.delete('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const success = await DatabaseConnection.getInstance().deleteProduct(productId);
        if (success) {
            res.status(200).send({ message: 'Product successfully deleted' });
        } else {
            res.status(404).send({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send({ message: 'Failed to delete product', error: error.message });
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
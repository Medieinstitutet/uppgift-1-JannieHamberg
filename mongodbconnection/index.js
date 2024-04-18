console.log("index.js");

const mongoDb = require("mongodb");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
   

    const url = 'mongodb://localhost:27017';
    const client = new mongoDb.MongoClient(url);


    client.connect().then(async () => {
        console.log("Connected to MongoDB");

        const db = client.db("Webshop");
        const collection = db.collection("orders");

      /*   return collection.insertMany([{a: 1}, {a: 2}, {a: 3, name: "Test product", price: 123 }]).then(() => {
            console.log("Inserted documents into the collection"); */

        /*     return collection.find({}).toArray().then((results) => {
                console.log("Found result in the collection");
                res.json(results);
              
            }) */
            const pipeline = [
                        {
                        $lookup:
                            /**
                             * from: The target collection.
                             * localField: The local join field.
                             * foreignField: The target join field.
                             * as: The name for the results.
                             * pipeline: Optional pipeline to run on the foreign collection.
                             * let: Optional variables to use in the pipeline field stages.
                             */
                            {
                            from: "lineItems",
                            localField: "order",
                            foreignField: "id",
                            as: "lineItems",
                            pipeline: [
                                {
                                $lookup: {
                                    from: "products",
                                    localField: "id",
                                    foreignField: "product",
                                    as: "linkedProduct",
                                },
                                },
                                {
                                $addFields:
                                    /**
                                     * newField: The new field name.
                                     * expression: The new field expression.
                                     */
                                    {
                                    linkedProduct: {
                                        $first: "$linkedProduct",
                                    },
                                    },
                                },
                            ],
                            },
                        },
                        {
                        $lookup:
                            /**
                             * from: The target collection.
                             * localField: The local join field.
                             * foreignField: The target join field.
                             * as: The name for the results.
                             * pipeline: Optional pipeline to run on the foreign collection.
                             * let: Optional variables to use in the pipeline field stages.
                             */
                            {
                            from: "customers",
                            localField: "id",
                            foreignField: "customers",
                            as: "linkedCustomer",
                            },
                        },
                        {
                        $addFields:
                            /**
                             * newField: The new field name.
                             * expression: The new field expression.
                             */
                            {
                            linkedCustomer: {
                                $first: "$linkedCustomer",
                            },
                            calculatedTotal: {
                                $sum: "$lineItems.totalPrice",
                            },
                            },
                        },
                    ]


            const aggregate = collection.aggregate(pipeline); 

            const orders = [];

            for await ( let document of aggregate ) {
                orders.push(document);
            }

            return orders;
            
            }).then((orders) => {
                res.json(orders)
            }) .finally(() => {
                client.close()
                
                });
            })



   


app.listen(3000);


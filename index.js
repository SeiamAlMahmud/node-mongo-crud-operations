const express = require('express')
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 3001
const pass = 'AZ7tIiC6qKro7doh'
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const uri = "mongodb+srv://samahmud:AZ7tIiC6qKro7doh@first-project.dkbbjak.mongodb.net/?retryWrites=true&w=majority&appName=First-Project";

//Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("organicdb").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const database = client.db('organicdb');
    const productCollection = database.collection('products')
    const products = {
      id: 1,
      name: 'mahmud',
      quantity: 5,
      price: 10,
      method: 'usd'
    }

    // productCollection.insertOne(products)
    // .then(res => console.log('first',res))

    app.post('/addProduct', (req, res) => {
      const productData = req.body; // Access form data in the request body
      console.log('Form data:', productData);
  
      // Perform validation or processing with productData
      // ...
  
      res.send('Product added successfully!'); 
  });

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, () => console.log('npm start on 3000 port'))
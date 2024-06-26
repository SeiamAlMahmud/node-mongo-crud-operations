const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const port = process.env.PORT || 3000
const pass = 'AZ7tIiC6qKro7doh'
const app = express()
app.use(cors())
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

    app.post("/addProduct", async (req, res) => {
      const formData = req.body;
      console.log(formData)
      const result = await productCollection.insertOne(formData)
      // .then(result => {
      res.send(result)
      // })

      console.log(formData)
    })




    //get all query data
    app.get("/product", async (req, res) => {
      const allResult = await productCollection.find().toArray();
      // for single rewards
      // const result = await productCollection.find({name: 'mahmud'}).toArray();
      res.send(allResult);
    });

    // delete data 
    app.delete("/delete/:id", async (req,res)=>{
      const id = req.params.id
      console.log(id)
      const result = await productCollection.deleteOne({_id: new ObjectId(id)})
      console.log(result)
      res.send(result)
    })
    // SINGLE PRODUCT 
    app.get("/product/:id", async (req,res) => {
      const id = req.params.id
      const singleResult = await productCollection.find({_id: new ObjectId(id)}).toArray()
      res.send(singleResult[0])
      console.log(singleResult[0])
    })
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
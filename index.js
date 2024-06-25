const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const pass = 'AZ7tIiC6qKro7doh'
const app = express()



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
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('first')
})

app.listen(3000, () => console.log('npm start on 3000 port'))
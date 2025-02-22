const express = require('express')
const app = express();
var cors = require('cors')
require('dotenv').config()
const port =process.env.PORT||3000
app.use(cors());
app.use(express.json());;

app.get('/', (req, res) => {
  res.send('Task management app running')
})


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mngo1.mrkjr.mongodb.net/?retryWrites=true&w=majority&appName=mngo1`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
    // await client.connect();

    //database and collection
    const database = client.db("jobtask");
    const taskCollection = database.collection("tasks");
    const userCollection = database.collection("users");
//users
app.post('/users',async(req,res)=>{
  const user=req.body;
  const query={email:user.email};
  const isExists=await userCollection.findOne(query);
  if(isExists){
    return res.send({
      message:"User Already exists",
      insertedId:null
    })
  }

  const result=await userCollection.insertOne(user);
  res.send(result)
})
 // Add Task
app.post("/tasks",async(req,res)=>{
    const data=req.body;
    const result=await taskCollection.insertOne(data);
    res.send(result);
})
//get task
app.get("/tasks",async(req,res)=>{
    const result=await taskCollection.findOne();
    res.send(result);
})
//edit task 
app.get("task/:id",async(req,res)=>{
    const id=req.params.id;
    const query={_id:new ObjectId(id)};
    const result=await taskCollection.findOne(query);
    res.send(result);
})
app.put("/tasks/:id",async(req,res)=>{
    const id=req.params.id;
    const filter={_id:new ObjectId(id)};
    const tobeUpdated=req.body;
    const options = { upsert: true };
    const updateDoc = {
        $set: {
          plot: tobeUpdated
        },
      };
      const result = await taskCollection.updateOne(filter, tobeUpdated);
      res.send(result);
})
// delete task
app.delete("/tasks/:id",async(req,res)=>{
    const id=req.params.id;
    const query={_id:new ObjectId(id)};
    const result=await taskCollection.deleteOne(query);
    res.send(result);
})





  
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


const express = require('express')
const app = express();
var cors = require('cors')
require('dotenv').config()
const port =process.env.PORT||3000
//Must remove "/" from your production URL
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://jobtask-b4e37.firebaseapp.com",
      "https://jobtask-b4e37.web.app",
      "https://task-manager1r.netlify.app"
      
    ],
    credentials: true,
  })
);

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
    const result=await taskCollection.find().toArray();
    res.send(result);
})
//edit task 
app.get("/task/:id",async(req,res)=>{
    const id=req.params.id;
    const query={_id:new ObjectId(id)};
    const result=await taskCollection.findOne(query);
    res.send(result);
})
app.put("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const tobeUpdated = req.body;

  const updateDoc = {
      $set: tobeUpdated,
  };

  try {
      const result = await taskCollection.updateOne(filter, updateDoc);
      if (result.matchedCount === 0) {
          return res.status(404).send({ message: "Task not found" });
      }
      res.send({ message: "Task updated successfully", result });
  } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).send({ message: "Failed to update task", error });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  const query = { _id: new ObjectId(id) };
  const result = await taskCollection.deleteOne(query);

  if (result.deletedCount === 0) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json({ message: "Task deleted successfully", deletedCount: result.deletedCount });
});


//Update category
app.patch('/taskss/:id', async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;

  try {
    const result = await db.collection('tasks').updateOne(
      { _id: new ObjectId(id) },
      { $set: { category } }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Task category updated successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating task category' });
  }
});


  
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


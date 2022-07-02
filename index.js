const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://dbuser1:uh9Msww10zdYvJwJ@cluster0.cdo8i.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const toDoTasksCollection = client.db('endGameDb').collection('toDoTasks');
        const completeTaskCollection = client.db('endGameDb').collection('completeTask');
        console.log('database connected');


        app.post('/tasks', async (req, res) => {
            const newTask = req.body;
            console.log('adding new user', newTask);
            const result = await toDoTasksCollection.insertOne(newTask);
            res.send(result);
        });

        app.get('/tasks', async (req, res) => {
            const query = {};
            const cursor = toDoTasksCollection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks);
        })

        app.put('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const updatedTask = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    text: updatedTask.text
                }
            };
            const result = await toDoTasksCollection.updateOne(filter, updatedDoc, options);
            res.send(result);

        })

        app.post('/complete', async (req, res) => {
            const newTask = req.body;
            console.log('adding new user', newTask);
            const result = await completeTaskCollection.insertOne(newTask);
            res.send(result);
        });

        app.get('/complete', async (req, res) => {
            const query = {};
            const cursor = completeTaskCollection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks);
        })
        app.delete('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await toDoTasksCollection.deleteOne(query);
            res.send(result);
        })

    }
    finally {

    }
}
run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('Hello from end-game')
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
// uh9Msww10zdYvJwJ

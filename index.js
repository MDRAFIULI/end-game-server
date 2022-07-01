const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

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
        console.log('database connected');


        app.post('/tasks', async (req, res) => {
            const newTask = req.body;
            console.log('adding new user', newTask);
            const result = await toDoTasksCollection.insertOne(newTask);
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

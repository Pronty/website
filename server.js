const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const uri = "mongodb+srv://guptaprajwal02:PIoxeB72TFLZPb8yacCluster0.m8sLyqa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const database = client.db('myDatabase'); // Replace with your database name
    const collection = database.collection('data'); // Replace with your collection name

    app.post('/save', async (req, res) => {
      try {
        const data = req.body;
        await collection.insertOne(data); // Save data to MongoDB
        res.send({ status: 'ok' });
      } catch (error) {
        console.error('Error saving to MongoDB:', error);
        res.status(500).send({ status: 'error', message: 'Failed to save data' });
      }
    });

  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

run().catch(console.dir);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Ensure the client closes when the process ends (optional for production)
process.on('SIGTERM', async () => {
  await client.close();
  process.exit(0);
})
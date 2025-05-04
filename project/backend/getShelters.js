// getShelters.js

// 1. Require the MongoDB client
const { MongoClient } = require('mongodb');

// 2. Placeholder for your Atlas connection string.
//    Replace <username>, <password>, <cluster-url>, and <dbname> as appropriate.
const uri = "mongodb+srv://aashira:2dw55sMw80aBkdDc@cluster0.ffv5vdf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// 3. Create a client instance
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 4. Name of the collection holding your shelter info
const COLLECTION_NAME = "shelters";

/**
 * Connects to MongoDB (if not already),
 * fetches all shelter documents, and returns them.
 */
async function getAllShelters() {
  try {
    // Connect only once; subsequent calls reuse the existing connection
    if (!client.isConnected()) {
      await client.connect(); 
      console.log("✅ Connected to MongoDB Atlas"); 
    }

    // Select your database (the <dbname> in the URI)
    const db = client.db(); 
    const collection = db.collection(COLLECTION_NAME);

    // Retrieve all documents
    const shelters = await collection.find({}).toArray();
    return shelters;

  } catch (err) {
    console.error("🔴 Error fetching shelters:", err);
    throw err;
  }
}

// Export the function for use in your routes
module.exports = {
  getAllShelters,
};

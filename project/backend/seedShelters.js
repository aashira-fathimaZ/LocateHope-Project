// seedShelters.js

const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

// 1. Replace with your Atlas connection string (use .env in production)
const uri = process.env.MONGODB_URI || mongodb+srv://aashira:2dw55sMw80aBkdDc@cluster0.ffv5vdf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function seed() {
  try {
    await client.connect();                                         
    console.log("🔗 Connected to MongoDB Atlas");

    const db = client.db();                                        
    const collection = db.collection("shelters");                  

    // 2. Read JSON file
    const dataPath = path.join(__dirname, "data", "shelters.json");
    const shelters = JSON.parse(fs.readFileSync(dataPath, "utf8"));

    // 3. Optional: clear existing for idempotence
    await collection.deleteMany({});
    console.log("🗑️  Cleared existing shelters");

    // 4. Insert new data
    const result = await collection.insertMany(shelters);
    console.log(`✅ Inserted ${result.insertedCount} shelters`);
  } catch (err) {
    console.error("❌ Seeding error:", err);
  } finally {
    await client.close();
    console.log("🔒 Connection closed");
  }
}

seed();

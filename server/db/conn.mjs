//Connection for mongoDB
import { MongoClient } from "mongodb";

//Assigns connectionString to ATLAS_URI (defined in .env)
const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

//Connect to DB
let conn;
try {
  console.log("Connecting to Database...");
  conn = await client.connect();
  console.log("Database Connected");
} catch(e) {
  console.error(e);
  console.log("Failed to Connect to MongoDB check acces");
}

let db = conn.db("Inventory");

export default db;
//Imports
import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import inventory from "./routes/stockDB.mjs";
import prodInv from "./routes/productDB.mjs"
import catInv from "./routes/categoryDB.mjs"

//Express setup
const PORT = 5050;
const app = express();

//Cors setup
app.use(cors());
app.use(express.json());

//Pull from DB
app.use("/stockDB", inventory);
app.use("/productDB", prodInv);
app.use("/categoryDB", catInv);


// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

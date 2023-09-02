//Server API endpoint
//Returns DB item to server
import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("Stock");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single stock by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("Stock");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new stock.
router.post("/", async (req, res) => {
  let newDocument = {
    productDesc: req.body.productDesc,
    stockExp: req.body.stockExp,
    categoryDesc: req.body.categoryDesc,
    stockQty: req.body.stockQty,
  };
  let collection = await db.collection("Stock");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a stock by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      productDesc: req.body.productDesc,
      stockExp: req.body.stockExp,
      categoryDesc: req.body.categoryDesc,
      stockQty: req.body.stockQty
    }
  };

  let collection = await db.collection("Stock");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

// This section will help you delete a stock
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("Stock");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

router.get('/', (req, res) => {
  stockService.getAll(req.query).then(stock =>{
      res.status(200).json(stock)
  }).catch(() => res.status(500).end())
})

export default router;
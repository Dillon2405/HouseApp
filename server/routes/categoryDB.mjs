//Server API endpoint
//Returns DB item to server
import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/categoryList", async (req, res) => {
  let collection = await db.collection("Categories");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single product by id
router.get("/categoryList/:id", async (req, res) => {
  let collection = await db.collection("Categories");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new product.
router.post("/categoryList", async (req, res) => {
  let newCategory = {
    categoryDesc: req.body.categoryDesc,
  };
  let collection = await db.collection("Categories");
  let result = await collection.insertOne(newCategory);
  res.send(result).status(204);
});

// This section will help you update a product by id.
router.patch("/categoryList/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      categoryDesc: req.body.categoryDesc,
    }
  };

  let collection = await db.collection("Categories");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

// This section will help you delete a product
router.delete("/categoryList/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("Categories");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

router.get('/categoryList', (req, res) => {
  productService.getAll(req.query).then(product =>{
      res.status(200).json(product)
  }).catch(() => res.status(500).end())
})

export default router;
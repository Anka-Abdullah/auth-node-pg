import express from "express";
const router = express.Router();

import c from "../controller/index.js";

const use = fn =>(req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
}

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/signup", c.createUser);

export default router;

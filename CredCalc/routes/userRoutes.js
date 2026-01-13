import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/save", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.get("/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  res.json(user);
});

export default router;

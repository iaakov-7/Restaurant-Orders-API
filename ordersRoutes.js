import express from "express";
import { createOrder } from "./repo.js";

export const router = express.Router();

router.post("/", async (req, res) => {
  const { customer, table } = req.body;
  await createOrder(customer, table);
  res.status(201).json({ message: "Created successfully" });
});

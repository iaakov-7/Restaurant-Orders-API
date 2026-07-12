import express from "express";
import { createOrder } from "./repo.js";
import { validCreateMiddleware } from "./middlewares.js";

export const router = express.Router();

router.post("/", validCreateMiddleware, async (req, res) => {
  const { customer, table } = req.body;
  await createOrder(customer, table);
  res.status(201).json({ message: "Created successfully" });
});

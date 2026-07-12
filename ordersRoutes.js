import express from "express";
import { createOrder, getOrders } from "./repo.js";
import { validCreateMiddleware } from "./middlewares.js";

export const router = express.Router();

router.post("/", validCreateMiddleware, async (req, res) => {
  const { customer, table } = req.body;
  await createOrder(customer, table);
  res.status(201).json({ message: "Created successfully" });
});

router.get("/", async (req, res) => {
  const { status, customer, table } = req.query;
  const orders = await getOrders(status, customer, table);
  res.json({ sucess: true, orders });
});

import express from "express";
import { createOrder, getOrders, getOrderById } from "./repo.js";
import { validCreateMiddleware, checkIdMiddleware } from "./middlewares.js";
import { error } from "node:console";

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

router.get("/:id", checkIdMiddleware, async (req, res) => {
  const id = parseInt(req.params.id);
  const order = await getOrderById(id);
  if (!order) {
    const error = new Error("order is not found");
    error.statusCode = 404;
    throw error;
  }
  res.json({ success: true, order });
});

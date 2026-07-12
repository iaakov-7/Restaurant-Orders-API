import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  updaeStatus,
} from "./repo.js";
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
  res.json({ success: true, order });
});

router.put(
  "/:id",
  checkIdMiddleware,
  validCreateMiddleware,
  async (req, res) => {
    const id = parseInt(req.params.id);
    const { customer, table } = req.body;
    await updateOrder(id, customer, table);
    res.json({ success: true, message: `Order ${id} updated successfully` });
  },
);

router.delete("/:id", checkIdMiddleware, async (req, res) => {
  const id = parseInt(req.params.id);
  await deleteOrder(id);
  res.json({ success: true, message: `Order ${id} deleted successfully` });
});

router.patch("/:id/status", checkIdMiddleware, async (req, res) => {
  const id = parseInt(req.params.id);
  const status = req.body.status;

  await updaeStatus(id, status);
  res.json({ success: true, message: `Order ${id} updated successfully` });
});

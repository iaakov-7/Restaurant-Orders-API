import { readJson, writeJson } from "./IO.js";
import { validUpdateStatus } from "./validation.js";

export async function createOrder(customer, table) {
  const orders = await readJson("./db/orders.json");
  const order = {
    id: orders.length > 0 ? orders[orders.length - 1].id + 1 : 1,
    status: "NEW",
    customer,
    table,
  };
  orders.push(order);
  await writeJson("./db/orders.json", orders);
}

export async function getOrders(status, customer, table) {
  let orders = await readJson("./db/orders.json");
  if (status) orders = orders.filter((order) => order.status === status);
  if (customer) orders = orders.filter((order) => order.customer === customer);
  if (table) orders = orders.filter((order) => order.table == table);
  return orders;
}

export async function getOrderById(id) {
  const orders = await readJson("./db/orders.json");
  const order = orders.find((order) => order.id === id);
  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }
  return order;
}

export async function updateOrder(id, customer, table) {
  const orders = await readJson("./db/orders.json");
  const order = orders.find((order) => order.id === id);
  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }
  order.customer = customer;
  order.table = table;
  console.log("updating");
  await writeJson("./db/orders.json", orders);
}

export async function deleteOrder(id) {
  let orders = await readJson("./db/orders.json");
  const order = orders.find((order) => order.id === id);
  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }
  orders = orders.filter((order) => order.id !== id);
  await writeJson("./db/orders.json", orders);
}

export async function updaeStatus(id, status) {
  const orders = await readJson("./db/orders.json");
  const order = orders.find((order) => order.id === id);
  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }
  validUpdateStatus(order, status);

  await writeJson("./db/orders.json", orders);
}

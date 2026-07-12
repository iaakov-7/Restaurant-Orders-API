import { readJson, writeJson } from "./IO.js";

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
  return order;
}

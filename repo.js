import { readJson, writeJson } from "./IO.js";

export async function createOrder(status, customer, table) {
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

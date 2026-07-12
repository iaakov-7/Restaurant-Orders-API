import express from "express";
import { router } from "./ordersRoutes.js";
import { loggerMiddleware } from "./middlewares.js";

const app = express();
app.use(express.json());

app.use(loggerMiddleware);
app.use("/orders", router);

app.listen(3000, () => console.log("Server is listenong on port 3000"));

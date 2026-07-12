import express from "express";
import { router } from "./ordersRoutes.js";
import { loggerMiddleware } from "./middlewares.js";
import { errorHandler } from "./error_handler.js";

const app = express();

app.use(express.json());

app.use(loggerMiddleware);

app.use("/orders", router);

app.use(errorHandler);

app.listen(3000, () => console.log("Server is listening on port 3000"));

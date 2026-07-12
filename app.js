import express from "express";
import { router } from "./ordersRoutes.js";
import { loggerMiddleware } from "./middlewares.js";
import { errorHandler } from "./error_handler.js";

const app = express();

app.use(express.json());

app.use(loggerMiddleware);

app.use("/orders", router);

app.use(errorHandler);
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Invalid rout" });
});
app.listen(3000, () => console.log("Server is listening on port 3000"));

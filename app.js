import express from "express";
import { router } from "./router.js";

const app = express();

app.use("/orders", router);

app.listen(3000, () => console.log("Server is listenong on port 3000"));

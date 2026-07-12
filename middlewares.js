import { error } from "node:console";

export function loggerMiddleware(req, res, next) {
  const date = new Date().toLocaleDateString();
  console.log("[LOG] " + date + " " + req.method, req.url);
  next();
}

export function validCreateMiddleware(req, res, next) {
  const errors = [];
  if (!req.body.customer || typeof req.body.customer !== "string") {
    errors.push("Field status is required and must be type of string.");
  }
  if (!req.body.table || typeof req.body.table !== "number") {
    errors.push("Field table is required and must be type of number.");
  }
  if (errors.length > 0) {
    const error = new Error(errors);
    error.statusCode = 400;
    throw error;
  }
  next();
}

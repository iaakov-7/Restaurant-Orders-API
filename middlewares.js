export function loggerMiddleware(req, res, next) {
  const date = new Date().toLocaleDateString();
  console.log("[LOG] " + date + req.method, req.url);
  next();
}

export function validationMiddleware(req, res, next) {}

export function errorHandler(err, req, res, next) {
  return res
    .status(err.statusCode || 500)
    .json({
      success: false,
      message: err.statusCode ? err.message : "Server internal error",
    });
}

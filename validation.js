export function validUpdateStatus(order, status) {
  let message = "";
  if (order.status === "NEW") {
    if (
      status.toUpperCase() !== "PREPARING" &&
      status.toUpperCase() !== "CANCELLED"
    ) {
      message =
        "in case that status is new, updating must be preparing or cancelled ";
    } else order.status = status.toUpperCase();
  } else if (order.status === "PREPARING") {
    if (
      status.toUpperCase() !== "READY" &&
      status.toUpperCase() !== "CANCELLED"
    ) {
      message =
        "in case that status is preparing, updating must be ready or cancelled ";
    } else order.status = status.toUpperCase();
  } else if (order.status === "READY") {
    if (status.toUpperCase() !== "DELIVERED") {
      message =
        "in case that status is ready, updating must be ready or delivered ";
    } else order.status = status.toUpperCase();
  } else message = " Invalid status for updating";
  if (message.length > 1) {
    const error = new Error(message);
    error.statusCode = 400;
    throw error;
  }
}

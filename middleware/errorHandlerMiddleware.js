import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const statuscode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "Something went wrong,Please try again later...";
  res.status(statuscode).json({ msg: msg });
};

export default errorHandlerMiddleware;

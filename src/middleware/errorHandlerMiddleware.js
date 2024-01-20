import { StatusCodes } from 'http-status-codes';

// middleware that handles all the errors that accured during the requests
const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || 'Something went wrong, try again later';
  res.locals.errorOccurred =
    statusCode === StatusCodes.NOT_FOUND ? false : true;
  res.locals.message = msg;
  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;

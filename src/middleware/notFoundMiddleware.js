import { StatusCodes } from 'http-status-codes';

// middleware that handles requests that are not found
const notFoundMiddleware = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: 'not found' });
};

export default notFoundMiddleware;

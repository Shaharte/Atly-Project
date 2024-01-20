import Statistics from '../models/StatitsticsModel.js';
import errorHandlerMiddleware from './errorHandlerMiddleware.js';

// a middleware that handles and tracks the excution time of two requests,  [ POST /posts ] and [ GET /posts ]
const executionTimeTracker = (req, res, next) => {
  const startTime = process.hrtime();
  const method = req.method;
  res.on('finish', async () => {
    try {
      const [seconds, nanoseconds = 0] = process.hrtime(startTime); // getting seconds and nanoseconds from process.hrtime
      const totalTimeInMs = seconds * 1000 + nanoseconds / 1e6; // calculate total time in milliseconds
      const isError = res.locals.errorOccurred || false;
      const message = res.locals.message || null;
      await Statistics.create({
        method,
        executionTime: totalTimeInMs,
        isError,
        message,
      });
    } catch (error) {
      console.error('Error in executionTimeTracker:', error);
      // just catch the error silently, we can implement some notification mechanism to notify an error in executionTimeTracker
    }
  });

  next();
};
export default executionTimeTracker;

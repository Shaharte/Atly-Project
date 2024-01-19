import Statistics from '../models/StatitsticsModel.js';

const executionTimeTracker = (req, res, next) => {
  const startTime = process.hrtime();
  const method = req.method;
  res.on('finish', async () => {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const totalTimeInMs = seconds * 1000 + nanoseconds / 1e6;
    await Statistics.create({ method, executionTime: totalTimeInMs });
  });

  next();
};
export default executionTimeTracker;

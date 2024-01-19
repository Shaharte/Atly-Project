import 'express-async-errors';
import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

//Middlewares
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

const app = express();
dotenv.config();

//Setup express middleware to accept json
app.use(express.json());

// Enable CORS
app.use(cors());

//Routers
import postRouter from './routes/postRouter.js';
import statistcsRouter from './routes/statisticsRouter.js';
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/statistics', statistcsRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Not Found Middleware
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

// Error Middleware
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 8080;

try {
  await mongoose.connect(process.env.MONGO_DB_URI);
  app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

import 'express-async-errors';
import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
dotenv.config();

//Setup express middleware to accept json
app.use(express.json());

//Routers
import postRouter from './src/routes/postRouter.js';
import statistcsRouter from './src/routes/statisticsRouter.js';
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
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'something went wrong' });
});

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

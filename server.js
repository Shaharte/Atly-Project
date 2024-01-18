import express from 'express';
import * as dotenv from 'dotenv';

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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}....`);
});

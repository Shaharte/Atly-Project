import express from 'express';
import * as dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(express.json());

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`server running on PORT ${port}....`);
});

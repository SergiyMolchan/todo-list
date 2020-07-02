import {Request, Response} from "express";
import express from 'express';
import dbQuery from './database';
import todoRoutes from './routes/todo';
import config from './utils/config';
const {port} = config;

// Create a new express app instance
const app: express.Application = express();

app.use('/api/todo', todoRoutes);

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(port, function () {
  const result = dbQuery('CREATE DATABASE IF NOT EXISTS todolist');
  console.log(result);

  console.log(`App is listening on port ${port}.`);
});

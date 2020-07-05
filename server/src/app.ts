import {Request, Response} from "express";
import express from 'express';
import passport from 'passport';
import passportJwt from './middleware/passport';
import {dbQuery} from './database';
import todoRoutes from './routes/todoRoutes';
import userRoutes from './routes/userRoutes';
import config from './utils/config';
import {MysqlError, Query} from "mysql";
import {checkTableOfTodo} from "./models/todoModel";
import {checkTableOfUsers} from "./models/userModel";

const {port} = config;

// Create a new express app instance
const app: express.Application = express();

// passport js for auth
app.use(passport.initialize());
passportJwt(passport);

// api for requests
app.use('/api/auth', userRoutes);
app.use('/api/todo', todoRoutes);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(port, function () {
  try {
    // create database if note exists
    const query: Query | string = 'CREATE DATABASE IF NOT EXISTS todolist';
    dbQuery(query, () => {
      console.log('Data base is work.');
      // check tables if not identified create tables to database
      checkTableOfTodo();
      checkTableOfUsers();
    }, (error: MysqlError) => {
      console.error('error:', error.sqlMessage);
    });

    console.info(`App is listening on port ${port}.`);
  } catch (error) {
    console.error(error);
  }
});

import {dbQuery, checkTables} from '../database';
import InterfaceTodo from "../interfaces/interfaceTodo";
import {MysqlError, Query} from "mysql";
import InterfaceUser from "../interfaces/interfaceUser";

const tableName: string = 'users';

// create tables of users
const createTable = () => {
  const sql: Query | string = `CREATE TABLE ${tableName} (id INT AUTO_INCREMENT PRIMARY KEY, login VARCHAR(64) NOT NULL UNIQUE, password VARCHAR(255))`;
  dbQuery(sql, () => {
    console.info(`Table of ${tableName} created.`);
  }, (error: MysqlError) => {
    console.error(error.code, error.sqlMessage);
  });
};

// check table of task if not exists create table
export const checkTableOfUsers = () => checkTables(tableName, createTable);

// all CRUD operations return Promise for avoid hell of callbacks

// get user
export const getUser = (queryParams: InterfaceUser) => {
  const {login} = queryParams; // id of owner
  const sql: Query | string = `SELECT * FROM ${tableName} WHERE login = '${login}'`;
  return new Promise((resolve, rejects) => {
    dbQuery(sql, (result: any) => {
      const user: InterfaceUser = result[0];
      resolve(user);
    }, () => {
      resolve(undefined);
    });
  });
};

// get user by id
export const getUserById = (queryParams: any) => {
  const {id} = queryParams; // id of owner
  const sql: Query | string = `SELECT * FROM ${tableName} WHERE id = ${id}`;
  return new Promise((resolve, rejects) => {
    dbQuery(sql, (result: any) => {
      const user: InterfaceUser = result[0];
      resolve({id: user.id, login: user.login, password: user.password});
    }, () => {
      resolve(undefined);
    });
  });
};

// add user
export const createUser = (queryParams: InterfaceUser) => {
  const {login, password} = queryParams; // data of user
  const sql: Query | string = `INSERT INTO ${tableName} (login, password) VALUES ('${login}', '${password}')`;
  return new Promise((resolve, rejects) => {
    dbQuery(sql, (result: InterfaceUser) => {
      resolve(result);
    }, (error: MysqlError) => {
      rejects(error);
    });
  });
};


import {dbQuery, checkTables} from '../database';
import InterfaceTodo from "../interfaces/interfaceTodo";
import {MysqlError, Query} from "mysql";

const tableName: string = 'todo';

const createTable = () => {
  const sql: Query | string = `CREATE TABLE ${tableName} (id INT AUTO_INCREMENT PRIMARY KEY, owner INT, title VARCHAR(255), completed BOOLEAN, category VARCHAR(30))`;
  dbQuery(sql, () => {
    console.info(`Table of ${tableName} created.`);
  }, (error: MysqlError) => {
    console.error(error.code, error.sqlMessage);
  });
};

// check table of task if not exists create table
export const checkTableOfTodo = () => checkTables(tableName, createTable);

// all CRUD operations return Promise for avoid hell of callbacks

// get task list
export const getTodo = (queryParams: any) => {
  const {owner} = queryParams; // id of owner
  const sql: Query | string = `SELECT * FROM ${tableName} WHERE owner = ${owner}`;
  return new Promise((resolve, rejects) => {
    dbQuery(sql, (result: InterfaceTodo[]) => {
      resolve(result);
    }, (error: MysqlError) => {
      rejects(error);
    });
  });
};

// add task
export const createTodo = (queryParams: InterfaceTodo) => {
  const {owner, title, completed, category} = queryParams; // data of task
  const sql: Query | string = `INSERT INTO ${tableName} (owner, title, completed, category) VALUES ('${owner}', '${title}', '${completed ? 1 : 0}', '${category}')`;
  return new Promise((resolve, rejects) => {
    dbQuery(sql, (result: InterfaceTodo[]) => {
      resolve(result);
    }, (error: MysqlError) => {
      rejects(error);
    });
  });
};

// update task
export const updateTodo = (queryParams: InterfaceTodo) => {
  const {id, title, completed, category} = queryParams; // new data of task
  const sql: Query | string = `UPDATE ${tableName} SET title = '${title}', completed = '${completed ? 1 : 0}', category = '${category}' WHERE id = ${id}`;
  return new Promise((resolve, rejects) => {
    dbQuery(sql, (result: InterfaceTodo[]) => {
      resolve(result);
    }, (error: MysqlError) => {
      rejects(error);
    });
  });
};

// delete task
export const removeTodo = (queryParams: any) => {
  const {id} = queryParams; // id of task
  const sql: Query | string = `DELETE FROM ${tableName} WHERE id = ${id}`;
  return new Promise((resolve, rejects) => {
    dbQuery(sql, (result: InterfaceTodo[]) => {
      resolve(result);
    }, (error: MysqlError) => {
      rejects(error);
    });
  });
};

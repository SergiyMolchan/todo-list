import {dbQuery, checkTables} from '../database';
import {MysqlError, Query} from "mysql";

const tableName: string = 'todo';

const createTable = () => {
  const sql: Query | string = `CREATE TABLE ${tableName} (id INT AUTO_INCREMENT PRIMARY KEY, login VARCHAR(32), password VARCHAR(64))`;
  dbQuery(sql, () => {
    console.info(`Table of ${tableName} created.`);
  }, (error: MysqlError) => {
    console.error(error.code, error.sqlMessage);
  });
};

export const checkTableOfTodo = () => checkTables(tableName, createTable);

export const getTodo = () => {
  const sql: Query | string = 'SELECT * FROM todo';
  dbQuery(sql, (result: any) => {
    console.info('Users: ', result);
  }, (error: MysqlError) => {
    console.log(error.code, error.sqlMessage);
  });
};


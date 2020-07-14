import {MysqlError, Query} from 'mysql';
import mysql from 'mysql';
import config from './utils/config';

const {db_host, db_user, db_password, db_name} = config;

// create pool of connection
const pool = mysql.createPool({
  host: db_host,
  user: db_user,
  password: db_password,
  database: db_name
});

// query to database
export const dbQuery = (query: Query | string, callback: Function, errorHandler: Function): any => {
  new Promise((resolve, rejects) => {
    pool.query(query, function (error: MysqlError, results) {
      if (error) rejects(error);
      resolve(results);
    });
  }).then(results => callback(results)).catch(error => errorHandler(error));
};

// check table if not exists create table
export const checkTables = (tableName: string, callback: Function): void => {
  const sql: Query | string = `SHOW TABLES FROM ${db_name} LIKE ${tableName}`;
  dbQuery(sql, (result: any) => {
    console.info(`${tableName} table already exists in ${db_name}`);
  }, () => {
    callback();
  });
};

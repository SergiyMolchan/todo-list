import {dbQuery, checkTables} from '../database';
import InterfaceCategory from "../interfaces/interfaceCategory";
import {MysqlError, Query} from "mysql";

const tableName: string = 'category';

const createTable = () => {
  const sql: Query | string = `CREATE TABLE ${tableName} (id INT AUTO_INCREMENT PRIMARY KEY, owner INT, title VARCHAR(64))`;
  dbQuery(sql, () => {
    console.info(`Table of ${tableName} created.`);
  }, (error: MysqlError) => {
    console.error(error.code, error.sqlMessage);
  });
};

// check table of category if not exists create table
export const checkTableOfCategory = () => checkTables(tableName, createTable);

// all CRUD operations return Promise for avoid hell of callbacks

// get list of category
export const getCategory = (queryParams: any) => {
  const {owner} = queryParams; // id of owner
  const sql: Query | string = `SELECT * FROM ${tableName} WHERE owner = ${owner}`;
  return new Promise((resolve, rejects) => {
    dbQuery(sql, (result: InterfaceCategory[]) => {
      resolve(result);
    }, (error: MysqlError) => {
      rejects(error);
    });
  });
};

// add category
export const createCategory = (queryParams: InterfaceCategory) => {
  const {owner, title} = queryParams; // data of task
  const sql: Query | string = `INSERT INTO ${tableName} (owner, title) VALUES ('${owner}', '${title}')`;
  return new Promise((resolve, rejects) => {
    dbQuery(sql, (result: InterfaceCategory[]) => {
      resolve(result);
    }, (error: MysqlError) => {
      rejects(error);
    });
  });
};

// delete category
export const removeCategory = (queryParams: any) => {
  const {id, owner, title} = queryParams; // id of task
  const sql: Query | string = `DELETE FROM ${tableName} WHERE id = ${id}`;
  return new Promise((resolve, rejects) => {
    dbQuery(sql, (result: InterfaceCategory[]) => {
      // remove tasks of category from removed category
      const sql = `DELETE FROM todo WHERE owner = ${owner} AND category = '${title}'`;
      dbQuery(sql, () => {
        resolve({result});
      }, (error: MysqlError) => {rejects(error)});
    }, (error: MysqlError) => {
      rejects(error);
    });
  });
};

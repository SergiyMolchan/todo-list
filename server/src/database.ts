import {MysqlError, Query} from 'mysql';
import mysql from 'mysql';
import config from './utils/config';
const {db_host, db_user, db_password} = config;

// create pool of connection
const pool = mysql.createPool({
    host: db_host,
    user: db_user,
    password: db_password
});

// query to database
const query = (query: Query | string): any => {
    return pool.query(query, function(error: MysqlError, results) {
        if(error) throw error;
        return results;
    });
};

export default query;
// close pool
// pool.end(function(err: MysqlError | undefined) {
//     if (err) console.log('Error: ' + err.message);
//     console.log('pool closed.');
// });


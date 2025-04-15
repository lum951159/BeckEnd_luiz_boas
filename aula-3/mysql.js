const mysql = require('mysql2');

const pool = mysql.createConnection({
    "user": "root",
    "password": "root",
    "database": "idev3_luiz",
    "host": "localhost",
    "port": "3307"
});

exports.execute = (query, param = [], varPool = pool) => {
    return new Promise((resolve, reject) => {
        varPool.query(query, param, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

exports.pool = pool;

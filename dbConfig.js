const mysql = require('mysql2');

//Conectar a la BD cuando arranque la APP
/* const connect = () => {
    const pool = mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        port: 3306,
        database: 'letscollab'
    });
    global.db = pool;
} */
/* mysql://b3724f479d6e3c:1ddd86ad@eu-cdbr-west-01.cleardb.com/heroku_05d7aa9270ede45?reconnect=true */
const connect = () => {
    const pool = mysql.createPool({
        host: 'eu-cdbr-west-01.cleardb.com',
        user: 'b3724f479d6e3c',
        password: '1ddd86ad',
        port: 3306,
        database: 'heroku_05d7aa9270ede45'
    });
    global.db = pool;
}

module.exports = connect;
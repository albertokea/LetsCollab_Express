const mysql = require('mysql2');

//Conectar a la BD cuando arranque la APP
const connect = () => {
    const pool = mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        port: 3306,
        database: 'letscollab'
    });
    global.db = pool;
}

module.exports = connect;
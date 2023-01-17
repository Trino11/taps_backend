import mysql from 'promise-mysql';

require('dotenv').config()

const database={
    host:String(process.env.DBHOST),
    user:String(process.env.DBUSER),
    password:String(process.env.DBPASSWORD),
    database:String(process.env.DBDATABASE)
}

const pool = mysql.createPool(database);

pool.getConnection() //Database connector
    .then(connection => {
        pool.releaseConnection(connection);
        console.log('DB is connected')
    }).catch(err => console.log(err));

export default pool
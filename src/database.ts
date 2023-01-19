import mysql, { PoolConfig } from 'promise-mysql';

const database:PoolConfig={
    host:process.env.DBHOST,//@ts-ignore
    port:process.env.DBPORT,
    user:process.env.DBUSER,
    password:process.env.DBPASSWORD,
    database:process.env.DBDATABASE
}
console.log("Using database on " + process.env.DBHOST + ":" + process.env.PORT +" with user "+process.env.DBUSER)

const pool = mysql.createPool(database);

pool.getConnection() //Database connector
    .then(connection => {
        pool.releaseConnection(connection);
        console.log('DB is connected')
    }).catch(err => console.log(err));

export default pool
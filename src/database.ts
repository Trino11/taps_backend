import mysql, { PoolConfig } from 'promise-mysql';

const database:PoolConfig={
    host:String(process.env.DBHOST),
    port:Number(process.env.DBPORT),
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
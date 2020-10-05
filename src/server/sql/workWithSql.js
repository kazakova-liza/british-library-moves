import mysql from 'mysql';
import util from 'util';


const connectToDatabase = () => {
    const config = {
        host: '192.168.1.210',
        user: "remoteuser",
        password: "remoteuser",
        database: "bl",
    };

    // const config = {
    //     host: 'localhost',
    //     user: 'root',
    //     password: 'password',
    //     database: 'shoe_show'
    // };
    const connection = mysql.createConnection(config);
    connection.connect();
    return {
        query(sql, args) {
            return util.promisify(connection.query).call(connection, sql, args);
        },
        close() {
            return util.promisify(connection.end).call(connection);
        },
    };
}


export default connectToDatabase;
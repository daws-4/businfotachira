import {connect, connection} from "mongoose";
const conn ={
    isConnected: false
}
export async function connectDB() {
    if (conn.isConnected) {
        return
    }

    const db = await connect('mongodb://localhost:27017/businfotachira', )
    console.log(db.connection?.db?.databaseName)
    conn.isConnected = db.connections[0].readyState === 1;
}

    connection.on ('connected', () => {
        console.log('Mongo Connection Established')
    })

    connection.on('err', (err) => {
        console.log('Mongo Connection error', err)
    })



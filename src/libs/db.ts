import mongoose from 'mongoose';

const conn = {
    isConnected: false
};

mongoose.connection.setMaxListeners(60);

export async function connectDB() {
    if (conn.isConnected) {
        return;
    }

    const dburl = process.env.MONGODB;

    if (!dburl) {
        throw new Error("MongoDB URL is undefined");
    }

    try {
        const db = await mongoose.connect(dburl);

        console.log(`Connected to database: ${db.connection.db?.databaseName}`);
        conn.isConnected = db.connections[0].readyState === 1;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('Failed to connect to MongoDB');
    }
}

mongoose.connection.on('connected', () => {
    console.log('Mongo Connection Established');
});

mongoose.connection.on('error', (err) => {
    console.log('Mongo Connection error', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongo Connection Disconnected');
});
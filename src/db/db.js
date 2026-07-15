// src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

        if (!mongoUri) {
            throw new Error('MONGODB_URI or MONGO_URI is not defined in environment variables');
        }

        const conn = await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 5000
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return true;
    } catch (error) {
        console.warn(`MongoDB connection failed: ${error.message}`);
        return false;
    }
};

module.exports = connectDB;
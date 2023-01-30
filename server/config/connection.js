import mongoose from "mongoose";

const databaseUri = process.env.MONGODB_URI || "mongodb://127.0.0.1/wine-report";

export const createConnection = async () => {
    const conn = await mongoose.connect(
        databaseUri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    return conn.connection;
    
}
    

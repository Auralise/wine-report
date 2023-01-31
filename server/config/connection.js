import mongoose from "mongoose";

const databaseUri = process.env.MONGODB_URI || "mongodb://127.0.0.1/wine-report";

mongoose.connect(
    databaseUri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

export default mongoose.connection;
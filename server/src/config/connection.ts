import mongoose, { ConnectOptions } from "mongoose";

const databaseUri : string = process.env.MONGODB_URI || "mongodb://127.0.0.1/wine-report";

mongoose.connect(
    databaseUri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions
);

export default mongoose.connection;
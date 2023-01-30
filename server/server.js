//Server package imports
import * as express from "express";
import { ApolloServer } from "@apollo/server";
import * as path from "path";
import { authMiddleware } from "./utils/auth.js";

// configuration imports
import { typeDefs, resolvers } from "./schemas/index.js";
import db from "./config/connection";

//Environment config
import * as dotenv from "dotenv";
dotenv.config()

const PORT = process.env.port || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });

    db.once("open", () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}`);
            console.log(`GraphQL At http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
}

startApolloServer(typeDefs, resolvers);
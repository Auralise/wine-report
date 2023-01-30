//Server package imports
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import path from "path";
import { authMiddleware } from "./utils/auth.js";

//variable setup - These variables are lost when using 
import * as url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));


// configuration imports
import { typeDefs, resolvers } from "./schemas/index.js";
import { createConnection } from "./config/connection.js";

//Environment config
import * as dotenv from "dotenv";
dotenv.config()

//Configure and initialise server
const PORT = process.env.port || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const db = await createConnection();

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
    // Configure the auth middleware
    app.use(
        "/",
        expressMiddleware(server, {
            context: authMiddleware,
        })
    );
    
    db.once("open", () => {
        console.log("Attempting to start server"); 
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}`);
            console.log(`GraphQL At http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
}

startApolloServer(typeDefs, resolvers);
//Environment config
import * as dotenv from "dotenv";
dotenv.config()

//Server package imports
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import path from "path";
import cors from "cors";
import bodyParser from 'body-parser';
const { json } = bodyParser;
import { authMiddleware } from "./utils/auth.js";

//variable setup - These variables are lost when using 
import * as url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));


// configuration imports
import { typeDefs, resolvers } from "./schemas/index.js";
import { default as db } from "./config/connection.js";


//Configure and initialise server
const PORT = process.env.port || 3001;
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const startApolloServer = async (typeDefs, resolvers) => {
    
    // Provide file targets for express to serve
    
    app.use(express.static(path.join(__dirname, "../client/build")));
    
    
    app.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });


    db.on("error", (error) => {
        console.error("db connection error: ", error);
        return;
    });

    db.on("disconnect", () => {
        console.warn("Disconnected from the database");
    });

    db.on("reconnected", () => {
        console.log("Successfully reconnected to the database");
    })
    
    
    db.once("open", async () => {
        console.log("Attempting to start server");

        await server.start();
        // Configure the auth middleware
        app.use(
            "/graphql",
            cors(),
            json(),
            expressMiddleware(server, {
                context: authMiddleware,
            })
        );
        
        await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
        console.log(`Server ready and listening at http://localhost:${PORT}`);
        console.log(`GraphQL accessible at http://localhost:${PORT}/graphql`);

        // app.listen(PORT, () => {
        //     console.log(`API server running on port ${PORT}`);
        //     console.log(`GraphQL At http://localhost:${PORT}${server.graphqlPath}`);
        // });
    });
}

startApolloServer(typeDefs, resolvers);
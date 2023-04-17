
import http from "http";
import express from "express";
import { initialize, use } from "@oas-tools/core";
import { connectDB } from "./db.js";


const serverPort = 8080;
const app = express();
app.use(express.json({limit: '50mb'}));

const config = {
    middleware: {
        security: {
            auth:{

            }
        }
    }
}
const mongoUrl = "mongodb://127.0.0.1:27017/test";


use((req,resp,next) => {resp.setHeader('Content-Type', 'application/json'); next()}, {}, 0);

connectDB(mongoUrl).then(() => {
    initialize(app, config).then(() => {
        http.createServer(app).listen(serverPort, () => {
            console.log("\nApp running at http://localhost:" + serverPort);
            console.log("________________________________________________________________");
            if (!config?.middleware?.swagger?.disable !== false) {
                console.log('API docs (Swagger UI) available on http://localhost:' + serverPort + '/docs');
                console.log("________________________________________________________________");
            }
        });
    });
});


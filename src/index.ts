import express, { Application, request, response, Router } from 'express';
import fs from 'fs';
import https from 'https';
import cors from 'cors';
import httpProxy from 'http-proxy'
import sessions from './middlewares/t-sessions.js';
import auth from './middlewares/t-auth.js';
import permissions from './middlewares/t-permissions';

import statusRoutes from './routes/statusRoutes';
import loginRoutes from './routes/loginRoutes';
import infoRoutes from './routes/infoRoutes';
import utilsRoutes from './routes/utilsRoutes';
import manageRoutes from './routes/manageRoutes';
import manageUserRoutes from './routes/manageUserRoutes';
import manageInstanceRoutes from './routes/manageInstanceRoutes';
import recoveryRoutes from './routes/recoveryRoutes';
import session from 'express-session';
import actionsRoutes from './routes/actionsRoutes.js';

require('dotenv').config()

const hass = 'http://192.168.0.248:8123'

class Server {

    private app: Application;

    private optionsProxy = {
        target: hass,
        ws: true
    }

    private options = { //Certs files
        key: fs.readFileSync('crt/server.key'),
        cert: fs.readFileSync('crt/server.crt')
    }

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() { //Express configuration
        this.app.set("port", process.env.PORT || 3000);

        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(session({
            secret: String(process.env.KEYSSN),
            resave: false,
            saveUninitialized: true,
            cookie: { secure: true }
        }))
    }
    
    routes() { //Express routes configuration
        //this.app.use("/api");
        
        this.app.use("/api/status", statusRoutes);
        this.app.use("/api/login", loginRoutes);
        this.app.use("/api/manage/login", auth, sessions, permissions("login"), manageRoutes);
        this.app.use("/api/recovery", recoveryRoutes); //TODO:Actualizar rutas ./../info.md
        this.app.use("/api/manage/user", auth, sessions, manageUserRoutes);
        this.app.use("/api/manage/instance", auth, sessions, manageInstanceRoutes);
        this.app.use("/api/actions", auth, sessions, actionsRoutes);
        this.app.use("/api/info", auth, sessions, infoRoutes);
        this.app.use("/api/utils", auth, sessions, utilsRoutes);
    }


    start() {
        httpProxy.createServer({
            target: hass,
            ws: true,
            ssl: this.options
        }).listen(this.app.get("port") + 1);
        console.log("Proxy started. Listening on port ", this.app.get("port") + 1)

        https.createServer(this.options, this.app)
            .listen(this.app.get("port"), () =>
                console.log("Server started. Listening on port ", this.app.get("port"))); //https server
        //this.app.listen(this.app.get("port"), () => console.log("Server started. Listening on port ", this.app.get("port"))); //http server
    }
}
let server = new Server();
server.start();

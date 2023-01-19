import express, { Application, request, response, Router } from 'express';
import fs from 'fs';
import https from 'https';
import cors from 'cors';
// import httpProxy from 'http-proxy'
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

// const hass = ''

class Server {

    private app: Application;
    private isHttp: boolean = false;

    // private optionsProxy = {
    //     target: hass,
    //     ws: true
    // }

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() { //Express configuration
        this.app.set("port", process.env.PORT_ENV || 3000);

        console.log("Using database on " + process.env.DBHOST + ":" + process.env.PORT +" with user "+process.env.DBUSER)

        try {
            const myCert = {
                key: fs.readFileSync('crt/server.key'),
                cert: fs.readFileSync('crt/server.crt')
            }
            this.app.set("certs", myCert)//Selfsigned certs files
        } catch (error) {
            this.isHttp = true;
        }

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
        this.app.use("/api/recovery", recoveryRoutes);
        this.app.use("/api/manage/user", auth, sessions, manageUserRoutes);
        this.app.use("/api/manage/instance", auth, sessions, manageInstanceRoutes);
        this.app.use("/api/actions", auth, sessions, actionsRoutes);
        this.app.use("/api/info", auth, sessions, infoRoutes);
        this.app.use("/api/utils", auth, sessions, utilsRoutes);
    }


    start() {
        /*
        httpProxy.createServer({
            target: hass,
            ws: true,
            ssl: this.options
        }).listen(this.app.get("port") + 1);
        console.log("Proxy started. Listening on port ", this.app.get("port") + 1)
        */

        if (this.isHttp)
            this.app.listen(this.app.get("port"), () => console.log("Server started using http. Listening on port ", this.app.get("port"))); //http server
        else
            https.createServer(this.app.get("certs"), this.app)
                .listen(this.app.get("port"), () =>
                    console.log("Server started using https. Listening on port ", this.app.get("port"))); //https server
    }
}
let server = new Server();
server.start();

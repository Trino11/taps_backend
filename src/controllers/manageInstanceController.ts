import { Request, Response } from 'express';
import template from '../instancesTemplates/template';
import db from './../database'

class InfoController {

    private static getUid(req: Request) {
        try {
            let userId: number
            if (req.params.uid)
                userId = +req.params.uid
            else
                //@ts-ignore
                userId = req.uid
            if (typeof (userId) === 'number' && !Number.isNaN(userId) && userId != null && userId && userId > 0)
                return Math.floor(userId)
            throw new Error("UID is not valid")
        } catch (error) {
            throw error
        }
    }

    public async showAllAdminInstances(req: Request, res: Response) {
        try {
            //const instances = await db.query(`SELECT id, name FROM instances`)
            const instances = await db.query(`SELECT i.id AS 'id', i.name AS 'name', t.name AS 'tag' FROM instances i, tags t WHERE i.tag = t.id`)

            if (instances.length == 0)
                throw Error("There was a problem, no instances in db")
            res.status(200).json(instances)
        } catch (error: any) {
            res.status(400).json({ msg: "There was a problem, try again later", error: error.message })
        }
    }

    public async showAllInstances(req: Request, res: Response) {
        try {
            //const instances = await db.query(`SELECT id, name FROM instances`)
            const instances = await db.query(`SELECT i.id AS 'id', i.name AS 'name', t.name AS 'tag' FROM instances i, tags t WHERE i.tag = t.id AND i.admin = 0`)

            if (instances.length == 0)
                throw Error("There was a problem, no instances in db")
            res.status(200).json(instances)
        } catch (error: any) {
            res.status(400).json({ msg: "There was a problem, try again later", error: error.message })
        }
    }

    public async showInstances(req: Request, res: Response) {
        try {
            const uid = InfoController.getUid(req)
            const instances = await db.query(`SELECT i.id, i.name, t.name AS "tag" FROM instances i, userssubscribedinstances ui, tags t WHERE t.id = i.tag AND i.id = ui.instanceId AND ui.userId = ${uid}`)
            res.json(instances)

        } catch (error: any) {
            res.status(400).json({ msg: "There was a problem, try again later", error: error.message })
        }
    }

    public async showInstance(req: Request, res: Response) {
        try {
            const instance = req.params.iid
            const instanceInfo: any[] = await db.query(`SELECT i.id AS 'id', i.name AS 'name', t.name AS 'tag', t.path AS 'path' FROM instances i, tags t WHERE i.tag = t.id AND i.id = ${instance} AND i.admin = '0'`)
            if (instanceInfo.length == 0)
                throw new Error('The instance does not exists')
            let forUserInfo: any//{ id: string, name: string, checkStatusBatch: string, startBatch: string, stopBatch: string, restartBatch: string, forceStopBatch: string }
                = {
                id: instanceInfo[0].id,
                name: instanceInfo[0].name,
                tag: instanceInfo[0].tag
                // checkStatusBatch: fs.readFileSync(`${instanceInfo[0].path}${instanceInfo[0].name}\\latest\\latestCheckStatus.bat`).toString(),
                // startBatch: fs.readFileSync(`${instanceInfo[0].path}${instanceInfo[0].name}\\latest\\latestStart.bat`).toString(),
                // stopBatch: fs.readFileSync(`${instanceInfo[0].path}${instanceInfo[0].name}\\latest\\latestStop.bat`).toString(),
                // restartBatch: fs.readFileSync(`${instanceInfo[0].path}${instanceInfo[0].name}\\latest\\latestRestart.bat`).toString(),
                // forceStopBatch: fs.readFileSync(`${instanceInfo[0].path}${instanceInfo[0].name}\\latest\\latestForceStop.bat`).toString()
            }
            res.json(forUserInfo)
        } catch (error: any) {
            res.status(400).json({ msg: "There was a problem, try again later", error: error.message })
        }
    }

    public async showAdminInstance(req: Request, res: Response) {
        try {
            const instance = req.params.iid
            const instanceInfo: any[] = await db.query(`SELECT i.id AS 'id', i.name AS 'name', t.name AS 'tag', t.path AS 'path' FROM instances i, tags t WHERE i.tag = t.id AND i.id = ${instance}`)
            if (instanceInfo.length == 0)
                throw new Error('The instance does not exists')
            let forUserInfo: any//{ id: string, name: string, checkStatusBatch: string, startBatch: string, stopBatch: string, restartBatch: string, forceStopBatch: string }
                = {
                id: instanceInfo[0].id,
                name: instanceInfo[0].name,
                path: instanceInfo[0].path
                // checkStatusBatch: fs.readFileSync(`${instanceInfo[0].path}${instanceInfo[0].name}\\latest\\latestCheckStatus.bat`).toString(),
                // startBatch: fs.readFileSync(`${instanceInfo[0].path}${instanceInfo[0].name}\\latest\\latestStart.bat`).toString(),
                // stopBatch: fs.readFileSync(`${instanceInfo[0].path}${instanceInfo[0].name}\\latest\\latestStop.bat`).toString(),
                // restartBatch: fs.readFileSync(`${instanceInfo[0].path}${instanceInfo[0].name}\\latest\\latestRestart.bat`).toString(),
                // forceStopBatch: fs.readFileSync(`${instanceInfo[0].path}${instanceInfo[0].name}\\latest\\latestForceStop.bat`).toString()
            }
            res.json(forUserInfo)
        } catch (error: any) {
            res.status(400).json({ msg: "There was a problem, try again later", error: error.message })
        }
    }

    public async subscribeInstance(req: Request, res: Response) {
        try {
            const uid = InfoController.getUid(req)
            const iid = req.params.iid
            const query = await db.query(`SELECT admin FROM instances WHERE id = '${iid}'`)

            if (query[0].admin == '1') {
                throw new Error('This is an admin instance.')
            }
            await db.query(`INSERT INTO userssubscribedinstances (userId, instanceId) VALUES ('${uid}', '${iid}')`)
            res.json({ msg: "The user will be subscribed" })
        } catch (error: any) {
            res.status(400).json({ msg: "There was a problem, try again later", error: error.message })
        }
    }

    public async desubscribeInstance(req: Request, res: Response) {
        try {
            const uid = InfoController.getUid(req)
            const iid = req.params.iid
            const query = await db.query(`SELECT admin FROM instances WHERE id = '${iid}'`)

            if (query[0].admin == '1') {
                throw new Error('This is an admin instance.')
            }
            await db.query(`DELETE FROM userssubscribedinstances WHERE userId = ${uid} AND instanceId = ${iid}`)
            res.json({ msg: "The user will be desubscribed" })
        } catch (error: any) {
            res.status(400).json({ msg: "There was a problem, try again later", error: error.message })
        }
    }

    public async createInstance(req: Request, res: Response) {
        try {
            let isAdmin
            if (!req.body.name || !req.body.tag)
                throw new Error()
            const name = req.body.name
            const tag = req.body.tag.replace('default', 'Other')
            if (req.body.isAdmin) {
                isAdmin = '1'
            } else {
                isAdmin = '0'
            }
            await db.query(`INSERT INTO instances (name, tag, admin) SELECT '${name}', id, '${isAdmin}' FROM tags WHERE name = '${tag}';`)

            let exists2 = await db.query(`SELECT id FROM instances WHERE name = '${name}'`)
            //@ts-ignore
            db.query(`INSERT INTO userssubscribedinstances VALUES ('${req.session.uid}', '${exists2[0].id}')`)

            const query = await db.query(`SELECT path FROM tags WHERE name = '${tag}'`)
            const path = query[0].path + req.body.name + '\\latest\\'

            switch (req.body.tag) {
                case 'Minecraft':
                    const options = {
                        mem: req.body.options.mem,
                        version: req.body.options.version,
                        launcher: req.body.options.launcher,
                        port: req.body.options.port,
                        rconPort: req.body.options.rconPort,
                        rconPass: req.body.options.rconPass,
                        seed: req.body.options.seed
                    }
                    template.minecraftTemplate(path, req.body.name, options)
                    break;
                case 'Ark':
                    template.arkTemplate(path)
                    break;
                case 'Discord Bot':
                    template.discordBotTemplate(path)
                    break;
                case 'T6Plutonium':
                    template.t6PlutoniumTemplate(path)
                    break;
                case 'The Forest':
                    template.theForestTemplate(path)
                    break;
                case 'TeamSpeak3':
                    template.teamspeak3Template(path)
                    break;
                case 'Other':
                    template.otherTemplate(path)
                    break;
                default:
                    break;
            }
            res.status(200).json({ msg: "The instance will be created" })
        } catch (error: any) {
            res.status(400).json({ msg: "There was a problem, try again later" })
            console.log(error);

        }
    }
    public async deleteInstance(req: Request, res: Response) {
        try {
            const iid = req.params.iid
            await db.query(`DELETE FROM instances WHERE id = ${iid}`)
            res.json({ msg: "The instances will be deleted, the server will be archived." })
        } catch (error) {
            res.status(400).json({ msg: "There was a problem, try again later" })
            console.log(error);

        }
    }
}
const infoController = new InfoController();
export default infoController;
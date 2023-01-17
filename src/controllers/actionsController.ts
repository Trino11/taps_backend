import { Request, Response } from 'express';
import fs from 'fs'
import os from 'os'
import { exec } from 'child_process'
import db from '../database'

class ActionsController {
    public async start(req: Request, res: Response) {
        try {
            const qpath = await db.query(`SELECT path, i.name FROM tags t, instances i WHERE t.id = i.tag AND i.id = ${req.params.iid};`)
            const path = qpath[0].path
            const name = qpath[0].name

            exec(`${path}${name}\\latest\\latestStart.bat`, (err, stdout, stderr) => {
            })
            res.json({ msg: "serverStarted" })

        } catch (error) {
            res.status(400).json({ msg: 'There was a problem while starting the server' })
        }
    }
    public async stop(req: Request, res: Response) {
        try {
            const qpath = await db.query(`SELECT path, i.name FROM tags t, instances i WHERE t.id = i.tag AND i.id = ${req.params.iid};`)
            const path = qpath[0].path
            const name = qpath[0].name

            exec(`${path}${name}\\latest\\latestStop.bat`, (err, stdout, stderr) => {
                if (stderr == 'Connection failed.')
                    throw new Error()
                if (stdout.includes('Saved the game') && stdout.includes('Stopping the server'))
                    res.json({ msg: "serverStoped" })
            })

        } catch (error) {
            res.status(400).json({ msg: 'There was a problem while stoping the server' })
        }
    }
    public async restart(req: Request, res: Response) {
    }
    public async forceStop(req: Request, res: Response) {
    }
    public async checkStatus(req: Request, res: Response) {
        try {
            const qpath = await db.query(`SELECT path, i.name FROM tags t, instances i WHERE t.id = i.tag AND i.id = ${req.params.iid};`)
            const path = qpath[0].path
            const name = qpath[0].name

            exec(`${path}${name}\\latest\\latestCheckStatus.bat`, (err, stdout, stderr) => {
                if (stderr.includes('Connection failed.'))
                    res.json({ msg: "Offline" })
                else if (stdout.includes('of a max of')) {
                    let pos = stdout.search('There are')
                    stdout = stdout.substring(pos)
                    stdout = stdout.replace('There are ', '')
                    stdout = stdout.replace(' of a max of ', '/')
                    stdout = stdout.replace(' players online:', '')
                    res.json({ msg: stdout })
                }
                else
                    res.json({ msg: "Error" })
            })

        } catch (error) {
        }
    }
}
const actionsController = new ActionsController();
export default actionsController;
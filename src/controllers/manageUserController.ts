import { Request, Response } from 'express';
import db from './../database'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


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

    public async showUser(req: Request, res: Response) {
        try {
            const uid = InfoController.getUid(req)
            const data: Array<{ id: number, username: string, role: string, admin: any }> = await db.query(`SELECT u.id AS "id", u.username AS "username", r.name AS "role", r.admin AS "admin" FROM users u, userxroles ur, roles r WHERE u.id = ur.userId AND ur.roleId = r.id AND u.id = '${uid}'`)
            if (data.length == 0)
                throw Error("The user does not exist")
            if (data.length == 1)
                if (data[0].admin == 0)
                    data[0].admin = false
                else if (data[0].admin == 1)
                    data[0].admin = true

            res.status(200).json({ uid: data[0].id, username: data[0].username, role: data[0].role, admin: data[0].admin })
        } catch (error: any) {
            res.status(400).json({ msg: "There was a problem, try again later", error: error.message })
        }
    }

    public async showAllUsers(req: Request, res: Response) {
        try {
            const data: Array<{ id: number, username: string, role: string }> = await db.query(`SELECT u.id AS "uid", u.username AS "username", r.name AS "role" FROM users u, userxroles ur, roles r WHERE u.id = ur.userId AND ur.roleId = r.id`)
            if (data.length == 0)
                throw Error("There was a problem, no users in db")
            res.status(200).json(data)
        } catch (error: any) {
            res.status(400).json({ msg: "There was a problem, try again later", error: error.message })
        }
    }

    public async addUser(req: Request, res: Response) {
        try {
            if (!req.body.username || !req.body.password)
                throw new Error()
            const username = req.body.username
            const hashPassword = await bcrypt.hash(req.body.password, 10)

            await db.query(`INSERT INTO users (username, password) VALUES ('${username}', '${hashPassword}')`)
            let exists = await db.query(`SELECT id FROM users WHERE username = '${username}'`)
            db.query(`INSERT INTO userxroles VALUES ('${exists[0].id}', '2')`)
            res.status(200).json({ msg: "user will be created" })

        } catch (error: any) {
            res.status(400).json({ msg: "There was a problem, try again later", error: error.message })
        }
    }

    public async generateToken(req: Request, res: Response) {
        try {
            const key = jwt.sign({ creating: true }, String(process.env.JWTKEY))

            await db.query(`INSERT INTO users (username, password, token) VALUES ('UserToCreate', 'nopasswordyet', '${key}')`)
            let exists = await db.query(`SELECT id FROM users WHERE token = '${key}'`)

            await db.query(`INSERT INTO userxroles VALUES ('${exists[0].id}', '2')`)

            res.json({ msg: "ok", token: key })
        } catch (error: any) {
            res.status(400).json({ msg: "There was a problem, try again later", error: error.message })
        }
    }

    public async updateUser(req: Request, res: Response) {
        try {
            const uid = InfoController.getUid(req)
            if (req.body.username.length > 4) {
                const username = req.body.username
                await db.query(`UPDATE users SET username = '${username}' WHERE id = '${uid}';`)
            }
            else
                throw new Error("Username must have at least 5 characters")
            if (req.body.password.length > 4) {
                const hashPassword = await bcrypt.hash(req.body.password, 10)
                await db.query(`UPDATE users SET password = '${hashPassword}' WHERE id = '${uid}';`)
            }
            else
                throw new Error("Password must have at least 5 characters")

            res.status(200).json({ msg: "user will be updated" })

        } catch (error) {
            res.status(400).json({ msg: "There was a problem, try again later" })
        }
    }

    public async deleteUser(req: Request, res: Response) {
        try {
            const uid = InfoController.getUid(req)
            await db.query(`DELETE FROM users WHERE users.id = ${uid}`)
            res.json({ msg: "The user will be deleted" })
        } catch (error:any) {
            console.log(error.message)
            res.status(400).json({ msg: "There was a problem, try again later" })
        }
    }

}
const infoController = new InfoController();
export default infoController;
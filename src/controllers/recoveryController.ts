import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../database'

class RecoveryController {

    public async createUserByToken(req: any, res: any) {
        try {
            let token
            if (req.params.token) {//User created by a JWT on the URL
                token = req.params.token
                const value = jwt.verify(token, String(process.env.JWTKEY))//@ts-ignore
                if (value.creating != true)
                    throw new Error("The token is not valid")

            }
            if (!req.body.username || !req.body.password)
                throw new Error()
            const username = req.body.username
            const hashPassword = await bcrypt.hash(req.body.password, 10)

            await db.query(`UPDATE users SET username = '${username}', password = '${hashPassword}' WHERE users.token = '${token}';`)

            res.status(200).json({ msg: "user will be created" })

            // let exists = await db.query(`SELECT id FROM users WHERE username = '${username}'`)
            // db.query(`INSERT INTO userxroles VALUES ('${exists[0].id}', '2')`)

        } catch (error: any) {
            res.status(400).json({ msg: "There was a problem, try again later", error: error.message })
        }



        //res.json({ msg: "ok" })
    }
}
const recoveryController = new RecoveryController();
export default recoveryController;
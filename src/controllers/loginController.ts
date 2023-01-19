import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import db from '../database';

class LoginController {
    private static async userMatchPassword(user: string, pass: string): Promise<number> {
        try {
            let passQuery = await db.query(`SELECT password, id FROM users WHERE username = '${user}'`)
            if (String(passQuery[0].password).localeCompare("")==0)
                return passQuery[0].id
            if (bcrypt.compareSync(pass, passQuery[0].password)) //Compare the plain text pass with the hash stored in the database
                return passQuery[0].id //Return an object
            else
                throw new Error("Username and/or password are not correct.")
        } catch (error) {
            throw error
        }
    }

    private static generateToken(uid: number): string { //Generate a 7d token with the userId and the role on the payload
        const payload = { check: true, uid: uid };
        const token = jwt.sign(payload, String(process.env.JWTKEY), { expiresIn: '7d', algorithm: 'HS256' });
        return token
    }

    public async isLoginCorrect(req: Request, res: Response) { //Function called
        try {
            if (req.body.username.length >= 4 && req.body.username.length <= 20) { //Verify username lenght >=4 and <=20
                const uid: number = await LoginController.userMatchPassword(req.body.username, req.body.password) //Wait function to respond
                const token = LoginController.generateToken(uid) //Generate the token with the userId on it
                res.json({ msg: "user and pass are correct", token: token }).status(200)
                //db.query(`UPDATE users SET token='${token}' WHERE username = '${userData.uid}'`) //Update the user's token with the new one 

            }
            else
                throw new Error("Username and/or password are not correct.")
        } catch (error: any) {
            res.status(400).json({ msg: "There was a problem, try again later", error: error.message })
        }
    }


}
const loginController = new LoginController();
export default loginController;
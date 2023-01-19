import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class ManageController {

    public tryToken(req: Request, res: Response) { //Check if the token is valid, return 401 if not
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if (token?.includes("Bearer "))
            token = token?.slice(7, token.length) //Trim the "Bearer " text in the header token
        if (!token) { //If dont have a token header send a 401 and a msg
            res.status(401).json({ error: "you dont have a token" })
        }
        if (typeof (token) === 'string')
            jwt.verify(token, String(process.env.JWTKEY), (err, decod) => {
                if (err)
                    res.status(401).json({
                        msg: "Token is invalid or expired"
                    });
                else
                    res.status(200).json({
                        msg: "Token is valid"
                    });
            })
    }
}
const manageController = new ManageController();
export default manageController;
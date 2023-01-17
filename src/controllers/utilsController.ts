import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import https from 'https'

require('dotenv').config()

class StatusController {

    public giveStatus(req: Request, res: Response) { //Hash the password and send it to the user, for dev
        res.json({
            plain: req.body.password,
            hash: bcrypt.hashSync(req.body.password, 10)
        }).status(200);
    }
    public tryToken(req: Request, res: Response) { //Check if the token is valid, return 401 if not
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if (typeof (token) === 'string')
            jwt.verify(token, String(process.env.JWTKEY), (err, decod) => {
                if (err)
                    res.json({
                        msg: "Token is invalid or expired"
                    }).status(401);
                else
                    res.json({
                        msg: "Token is valid"
                    }).status(200);
            })

    }

    public minecraftVersions(req: Request, res: Response) {
        https.get('https://launchermeta.mojang.com/mc/game/version_manifest.json', res2 => {
            res2.resume()
            let data = '';

            res2.on('data', (chunk) => {
                data += chunk;
            });

            res2.on('close', () => {
                let json = JSON.parse(data);
                json = json.versions
                res.json(json)
            });

        })
    }

}
const statusController = new StatusController();
export default statusController;
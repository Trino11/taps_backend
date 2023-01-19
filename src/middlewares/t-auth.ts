import { Router } from "express";
import jwt from 'jsonwebtoken'

const auth = (req: any, res: any, next: Function) => { //Auth module middleware
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token?.includes("Bearer "))
        token = token?.slice(7, token.length) //Trim the "Bearer " text in the header token
    if (!token) { //If dont have a token header send a 401 and a msg
        res.status(401).json({ error: "you dont have a token" })
    }
    else {
        if (typeof (token) === 'string') //Ts need this line to know that token is a string and not a string[]
            jwt.verify(token, String(process.env.JWTKEY), (err, decod) => { //Verify the token
                if (err)
                    res.status(401).json({ msg: "Token is invalid or expired" })
                else if (typeof (decod) !== 'string') {
                    req.uid = decod?.uid //Store the userId on memory in the request
                    next()
                }
                //userId = decod?.userId
            })
    }
}

export default auth

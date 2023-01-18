import {Router} from 'express'
import recoveryController from '../controllers/recoveryController'

class RecoveryRoutes{

    public router: Router = Router()

    constructor(){
        this.config()
    }

    config(){
        this.router.post("/register/:token", recoveryController.createUserByToken) //Path to try a token
        this.router.get("/forgot", (req:any, res:any, next:Function)=>{res.send("This is not implemented yet, contact to an administrator for password recovery.")}) //Path for password recovery when forgot
    }
}
const recoveryRoutes = new RecoveryRoutes();
export default recoveryRoutes.router;
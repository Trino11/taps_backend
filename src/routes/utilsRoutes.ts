import {Router} from 'express'
import utilsController from '../controllers/utilsController'

class UtilsRoutes{

    public router: Router = Router()

    constructor(){
        this.config()
    }

    config(){
        this.router.get("/hash", utilsController.giveStatus) //Admin hash path util
        this.router.get("/tryToken", utilsController.tryToken) //Path to try a token
        this.router.get('/minecraftVersions', utilsController.minecraftVersions)
    }
}
const utilsRoutes = new UtilsRoutes();
export default utilsRoutes.router;
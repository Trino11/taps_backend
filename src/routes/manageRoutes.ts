import {Router} from 'express'
import manageController from '../controllers/manageController'

class ManageRoutes{

    public router: Router = Router()

    constructor(){
        this.config()
    }

    config(){
        this.router.get("/", manageController.tryToken) //Path to try a token
    }
}
const manageRoutes = new ManageRoutes();
export default manageRoutes.router;
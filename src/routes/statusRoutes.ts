import {Router} from 'express'
import statusController from '../controllers/statusController'

class StatusRoutes{

    public router: Router = Router()

    constructor(){
        this.config()
    }

    config(){        
        this.router.get("/", statusController.giveStatus) //Path to return the server status
    }
}
const statusRoutes = new StatusRoutes();
export default statusRoutes.router;

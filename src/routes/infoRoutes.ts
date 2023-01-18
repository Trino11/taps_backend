import { Router } from 'express';
import infoController from '../controllers/infoController'

class InfoRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }
    
    config() {
        this.router.get("/", infoController.showInfo); //Temporaly path for devs
    }
}
const infoRoutes = new InfoRoutes();
export default infoRoutes.router;
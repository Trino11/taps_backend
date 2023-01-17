import { Router } from 'express';
import actionsController from '../controllers/actionsController'

class ActionsRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }
    
    config() {
        this.router.get("/start/:iid", actionsController.start);
        this.router.get("/stop/:iid", actionsController.stop);
        this.router.get("/restart/:iid", actionsController.restart);
        this.router.get("/forceStop/:iid", actionsController.forceStop);
        this.router.get("/checkStatus/:iid", actionsController.checkStatus);
    }
}
const actionsRoutes = new ActionsRoutes();
export default actionsRoutes.router;
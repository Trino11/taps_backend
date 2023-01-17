import { Router } from 'express';
import manageInstanceController from '../controllers/manageInstanceController'
import permissions from '../middlewares/t-permissions';

class ManageInstanceRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get("/all", permissions("instance-show-all"), manageInstanceController.showAllInstances); //Returns all instances info
        this.router.get("/admin/all", permissions("instance-show-admin"), manageInstanceController.showAllAdminInstances); //Returns all instances info
        this.router.get("/allSubscribed", permissions("instance-show-subscribed"), manageInstanceController.showInstances); //Returns all own subscribed instances info
        this.router.get("/allSubscribed/:uid", permissions("instance-show-other-subscribed"), manageInstanceController.showInstances); //Returns all instances info by uid
        this.router.get("/info/:iid", permissions("instance-show"), manageInstanceController.showInstance); //Returns instance info by iid
        this.router.get("/admin/info/:iid", permissions("instance-show-admin"), manageInstanceController.showAdminInstance); //Returns instance info by iid
        this.router.post("/subscribe/:iid", permissions("instance-subscribe"), manageInstanceController.subscribeInstance); //Subscribes to an instance by iid
        this.router.delete("/subscribe/:iid", permissions("instance-desubscribe"), manageInstanceController.desubscribeInstance); //Subscribes to an instance by iid
        this.router.post("/subscribe/:iid/:uid", permissions("instance-other-subscribe"), manageInstanceController.subscribeInstance); //Subscribes an user by uid to an instance by iid
        this.router.delete("/subscribe/:iid/:uid", permissions("instance-other-desubscribe"), manageInstanceController.desubscribeInstance); //Subscribes an user by uid to an instance by iid
        this.router.post("/create", permissions("instance-create"), manageInstanceController.createInstance); //Returns all instances info
        this.router.delete("/delete/:iid", permissions("instance-delete"), manageInstanceController.deleteInstance); //Returns all instances info
    }
}
const manageInstanceRoutes = new ManageInstanceRoutes();
export default manageInstanceRoutes.router;
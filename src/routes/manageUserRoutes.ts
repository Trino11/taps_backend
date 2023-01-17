import { Router } from 'express';
import manageUserController from '../controllers/manageUserController'
import permissions from '../middlewares/t-permissions';

class ManageRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }
    
     config() {//,permissions("user-show-all")
        this.router.get("/all", permissions("user-show-all"), manageUserController.showAllUsers); //Returns own user info CHECK
        this.router.get("/info", permissions("user-show"), manageUserController.showUser); //Returns own user info CHECK
        this.router.get("/info/:uid", permissions("user-show-all"), manageUserController.showUser); //Returns user info by uid CHECK
        this.router.post("/add", permissions("user-create"), manageUserController.addUser); //Creates a new user
        this.router.get("/addToken", permissions("user-create"), manageUserController.generateToken); //Creates a new user
        this.router.put("/update", permissions("user-update"), manageUserController.updateUser); //Updates own user
        this.router.put("/update/:uid", permissions("user-update-all"), manageUserController.updateUser); //Updates own user by uid
        this.router.delete("/delete/:uid", permissions("user-delete-all"), manageUserController.deleteUser); //Updates own user by uid
        }
}
const manageRoutes = new ManageRoutes();
export default manageRoutes.router;
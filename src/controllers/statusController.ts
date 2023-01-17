import { Request, response, Response } from 'express';
import https from 'https'

class StatusController {

    public giveStatus(req: Request, res: Response) {
        res.json({ status: "ok"}); //Check server status
    }
}
const statusController = new StatusController();
export default statusController;
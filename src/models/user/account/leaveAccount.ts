import { Request, Response } from "express";
import httpStatus from "../../../globalTypes/enums/httpStatus";

class LeaveAccount{
    public handle(_req: Request, res: Response){
        res
            .clearCookie('userToken')
            .redirect('/')
        res
            .status(httpStatus.PermanentRedirect)
            .send()
    }

}

export default new LeaveAccount()
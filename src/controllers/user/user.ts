import {TypeSendStatusFull} from "../../globalTypes/types/sendStatus";
import {TypeSendStatusMinify} from "../../globalTypes/types/sendStatus";
import Status from "../../globalTypes/enums/status";
import user from "../../models/user/index";
import httpStatus from "../../globalTypes/enums/httpStatus";
import { Request, Response } from "express";


class User{
    private async userMethodsErrorHandler(req: Request, res: Response, handleMethod: any): Promise<void>{
        try{
            new handleMethod(req, res)
        } catch (err: any){
            const sendError: TypeSendStatusFull = {
                    status: Status.Error,
                    message: 'unknown error',
                    errorObject: err
                }
            res.send(sendError)
        }
    }
    public leaveAccount(req: Request, res: Response){
        user.leaveAccount.handle(req, res)
    }
    private async isEmailExist(req: Request, res: Response): Promise<boolean>{
        return await user.isEmailExist(req, res)
    }

    public async createUser(req: Request, res: Response): Promise<void>{
        try {
            await this.isEmailExist(req, res).then((isExist: boolean): void => {
                isExist && ((): void => {
                    throw new Error('user already exists')
                })()
            })
            await this.userMethodsErrorHandler(req, res, user.createUser)
        } catch (err: any){
            const sendError: TypeSendStatusFull | TypeSendStatusMinify =
                err.message == 'user already exists' ?
                {
                    status: Status.Error,
                    message: 'user already exists'
                } :
                {
                        status: Status.Error,
                        message: 'unknown error',
                        errorObject: err
                }
            res.send(sendError)
        }
    }

    public async isValidPasswordAndEmail(req: Request, res: Response): Promise<void>{
        if (Object.keys(req.body).length !== 2 || !req.body?.email || !req.body?.password){
            res.status(httpStatus.BadRequest).send()
            return
        }

        return this.userMethodsErrorHandler(req, res, user.isValidPasswordAndEmail)
    }


    public updateUser(req: Request, res: Response): Promise<void>{
        return this.userMethodsErrorHandler(req, res, user.updateUser)
    }
}

export default new User();
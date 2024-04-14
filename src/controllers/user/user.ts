import {TypeSendStatusFull} from "../../globalTypes/types/sendStatus";
import {TypeSendStatusMinify} from "../../globalTypes/types/sendStatus";
import Status from "../../globalTypes/enums/status";
import user from "../../models/user/index";

class User{
    private async userMethodsErrorHandler(req: any, res: any, handleMethod: any): Promise<void>{
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
    private async isEmailExist(req: any, res: any): Promise<boolean>{
        return await user.isEmailExist(req, res)
    }

    public async createUser(req: any, res: any): Promise<void>{
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

    public isValidPasswordAndEmail(req: any, res: any): Promise<void>{
        return this.userMethodsErrorHandler(req, res, user.isValidPasswordAndEmail)
    }


    public updateUser(req: any, res: any): Promise<void>{
        return this.userMethodsErrorHandler(req, res, user.updateUser)
    }
}

export default new User();
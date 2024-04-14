import DBConnection from "../../DBConnection";
import {TypeSendStatusMinify} from "../../../globalTypes/types/sendStatus";
import { v4 as uuid4 } from "uuid";

class createUser{
    uniqueId: string

    constructor(req: any, res: any){
        this.uniqueId = uuid4()

        this.handle(req, res)
    }
    handle(req: any, res: any): void{
        DBConnection.sendQuery(`INSERT INTO users VALUES('${this.uniqueId}', '${req.body.email}', '${req.body.password}', '${JSON.stringify(req.body.settings)}', '${req.body.realName}', '${req.body.realSecondName}', '${req.body.gender}', '${req.body.region}', '${req.body.isArtist}');`)
            .then((rows: any): void => {
                res.cookie("userToken", this.uniqueId);
                res.send(
                    ((): TypeSendStatusMinify => rows.serverStatus == 2 ?
                        {status: 'ok', message: 'User is authorized'} :
                        {status: 'error', message: 'User isn\'t authorized'})()
                );
            }, (err) => res.send(err))
    }

}

export default createUser;
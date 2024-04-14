import QueryBody from "./QueryBody";
import DBConnection from "../../../DBConnection";
import Status from "../../../../globalTypes/enums/status";

class Upload{
    queryBody: QueryBody

    constructor() {
        this.queryBody = new QueryBody
    }

    public async handle(req: any, res: any){
        try{
            await DBConnection.sendQuery(await this.queryBody.create(req, res))
                .then((rows) => {
                    if (rows?.serverStatus == 2){
                        res.send({ status: Status.Ok, message: 'song was upload'})
                    } else {
                        res.send({ status: Status.Error, message: "DBConnection was failed"})
                    }
                }, (err) => res.send(err))
        } catch (err: any){
            res.send({ status: Status.Error, message: err.message})
        }
    }
}

export default new Upload
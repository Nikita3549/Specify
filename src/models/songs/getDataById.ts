import httpStatus from "../../globalTypes/enums/httpStatus";
import DBConnection from "../DBConnection";

class getDataById {
    public handle(req: any, res: any){
        this.DBQuery(req, res).then((rows) => {
            !(rows[0]) ? res.status(httpStatus.NotFound).send() : res.status(httpStatus.OK).send(rows[0])
        }, () => {
            res.status(httpStatus.InternalServerError)
        })
    }
    private async DBQuery(req: any, res: any){
        return await DBConnection.sendQuery(`SELECT * FROM songs WHERE id = '${req.params.songId}';`)
    }
}

export default new getDataById;
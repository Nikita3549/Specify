import { Request, Response } from "express";
import DBConnection from "../DBConnection";
import httpStatus from "../../globalTypes/enums/httpStatus";

class Search{
    public async byParam(_req: Request, res: Response, param: string){
        try {
            const rows = await DBConnection.sendQuery(`SELECT id FROM songs WHERE title LIKE '${param}' LIMIT 4`)
            if(!rows[0]){
                res.status(httpStatus.NotFound).send()
                return
            }
            res.status(httpStatus.OK).send(rows)
        } catch (err){
            console.log(err)
            res.status(httpStatus.InternalServerError).send()
        }
    }
}

export default new Search()
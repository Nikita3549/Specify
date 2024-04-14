import {NextFunction, Request, Response} from "express";
import DBConnection from "../../models/DBConnection";
import httpStatus from "../../globalTypes/enums/httpStatus";

export default function isAuthor(req: Request, res: Response, next: NextFunction){
    DBConnection.sendQuery(`SELECT email FROM users WHERE id = '${req.cookies.userToken}'`)
        .then((rows: Array<{ email?: string }>) => {
            if(rows[0]?.email){
                next()
            } else {
                res.status(httpStatus.BadRequest).send('User isn\'t author')
            }
        })
        .catch(() => res.status(httpStatus.BadRequest).send('User isn\'t author'))
}
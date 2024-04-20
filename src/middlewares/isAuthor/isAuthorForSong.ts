import {NextFunction, Request, Response} from "express";
import DBConnection from "../../models/DBConnection";
import httpStatus from "../../globalTypes/enums/httpStatus";

export default function isAuthorForSong(req: Request, res: Response, next: NextFunction){
    DBConnection.sendQuery(`SELECT title FROM songs WHERE authorId = '${req.cookies.userToken}' AND id = '${req.params.songId}'`)
        .then((rows: Array<{ title?: string }>) => {
            if(rows[0]?.title){
                next()
            } else {
                res.status(httpStatus.BadRequest).send('User isn\'t author')
            }
        })
        .catch((err) => {
            res.status(httpStatus.BadRequest).send('User isn\'t author')
        })
}
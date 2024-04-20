import {NextFunction, Request, Response} from "express";
import DBConnection from "../../models/DBConnection";
import httpStatus from "../../globalTypes/enums/httpStatus";

export default function isAuthorForSong(req: Request, res: Response, next: NextFunction){
    DBConnection.sendQuery(`SELECT isArtist FROM users WHERE id = '${req.cookies.userToken}'`)
        .then((rows: Array<{ isArtist?: string }>) => {
            if(rows[0]?.isArtist){
                next()
            } else {
                res.status(httpStatus.BadRequest).send('User isn\'t author')
            }
        })
        .catch(() => res.status(httpStatus.BadRequest).send('User isn\'t author'))
}
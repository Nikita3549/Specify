import DBConnection from "../../models/DBConnection";
import exceptionsForCookieCheck from "./exceptionsForCookieCheck";
import httpStatus from "../../globalTypes/enums/httpStatus";

function isSetCookies(req: any, res: any, next: any){
    if (exceptionsForCookieCheck.includes(req.url)){
        next()
        return
    }
    DBConnection.sendQuery(`SELECT email FROM users WHERE id = '${req.cookies.userToken}';`)
        .then(rows => {
            if (rows.length){
                next()
            } else{
                res.status(httpStatus.Unauthorized).send()
            }
        }, (_err) => res.status(httpStatus.InternalServerError).send())
}

export default isSetCookies
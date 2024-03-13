import DBConnection from "../../modules/DBConnection";
import exceptionsForCookieCheck from "./exceptionsForCookieCheck";

function isSetCookies(req: any, res: any, next: any): void{
    if (exceptionsForCookieCheck.includes(req.url)){
        next()
        return
    }
    DBConnection.sendQuery(`SELECT id FROM users WHERE id = '${req.cookies.userToken}'`)
        .then(rows => {
            if (rows.length){
                next()
            } else{
                res.send({ status: 'ok', message: 'user isn\'t authorized on page or userToken doesn\'t exist or url isn\'t in exceptions' })
            }
        }, (err) => res.send({ status: 'error', message: 'DBConnection error during verify userToken', errObject: err}))
}

export default isSetCookies
import DBConnection from "../../DBConnection";
import {RowDataPacket} from "mysql2";

function isValidPasswordAndEmail(req: any, res: any): Promise<boolean>{
    return new Promise((resolve: any, reject: any): void => {
        DBConnection.sendQuery(`SELECT * FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}';`)
            .then((rows: Array<any>): void => {
                res.send(!(rows.length == 0))
            })
    })
}

export default isValidPasswordAndEmail;
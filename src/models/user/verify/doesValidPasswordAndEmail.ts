import DBConnection from "../../DBConnection";
import httpStatus from "../../../globalTypes/enums/httpStatus";

function isValidPasswordAndEmail(req: any, res: any): Promise<boolean>{
    return new Promise((resolve: any, reject: any): void => {
        DBConnection.sendQuery(`SELECT id FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}';`)
            .then((rows: Array<{ id?: string }>) => {
                if (rows.length == 0){
                    res.status(httpStatus.NotFound).send()
                } else{
                    res.cookie("userToken", rows[0].id);
                    res.status(httpStatus.OK).send()
                }
            })
    })
}

export default isValidPasswordAndEmail;
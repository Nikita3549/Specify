import DBConnection from "../../DBConnection";

function isValidPasswordAndEmail(req: any, res: any): Promise<boolean>{
    return new Promise((resolve: any, reject: any): void => {
        DBConnection.sendQuery(`SELECT id FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}';`)
            .then((rows: Array<{ id?: string }>) => {
                if (rows.length == 0){
                    res.send(false)
                } else{
                    res.cookie("userToken", rows[0].id);
                    res.send(true)
                }
            })
    })
}

export default isValidPasswordAndEmail;
import DBConnection from "../../DBConnection";

async function doesEmailExist(req: any, res: any): Promise<boolean>{
    return new Promise((resolve, reject): void => {
        DBConnection.sendQuery(`SELECT * FROM users WHERE email = "${req.body.email}"`)
            .then((rows: any): void => {
                resolve(rows.length !== 0)
            })
    })

}

export default doesEmailExist;
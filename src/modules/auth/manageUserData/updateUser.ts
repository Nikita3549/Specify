import DBConnection from "../../DBConnection";
import {TypeSendStatusMinify} from "../../../models/types/sendStatus";

class updateUser{
    updateData: {
        password?: string,
        email?: string,
        realName?: string,
        realSecondName?: string,
        gender?: string,
        settings?: any
    }

    constructor(req: any, res: any){
        this.updateData = Object.assign(req.body)

        DBConnection.sendQuery(this.createQuery(req, res))
            .then(rows => {
                res.send({ status: 'ok', message: 'user data was updated'})
            }, rows => {
                res.send(JSON.stringify(rows))
            })
    }
    createQuery(req: any, _res: any): string{
        let query: string = 'UPDATE users SET '

        Object.entries(this.updateData).forEach((elem: [string, string | any], index: number): void => {
            typeof elem[1] !== 'string' && (elem[1] = JSON.stringify(elem[1]))

            if (index !== 0) query += ', '

            query += `${elem[0]} = '${elem[1]}'`
        })

        return query += (' ' + `WHERE id = '${req.cookies.userToken}'`)
    }
}

export default updateUser
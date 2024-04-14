import DBConnection from "../../DBConnection";
import {TypeSendStatusMinify} from "../../../globalTypes/types/sendStatus";
import httpStatus from "../../../globalTypes/enums/httpStatus";

class Update{
    updateData: {
        title?: string;
        genre?: string;
        lyrics?: string;
    }

    handle(req: any, res: any){
        this.updateData = Object.assign(req.body)

        DBConnection.sendQuery(this.createQuery(req, res))
            .then(rows => {
                res.status(httpStatus.NoContent).end()
            }, rows => {
                res.send(JSON.stringify(rows))
            })
    }
    createQuery(req: any, _res: any): string{
        let query: string = 'UPDATE songs SET '

        Object.entries(this.updateData).forEach((elem: [string, string | any], index: number): void => {
            typeof elem[1] !== 'string' && (elem[1] = JSON.stringify(elem[1]))

            if (index !== 0) query += ', '

            query += `${elem[0]} = '${elem[1]}'`
        })
        return query += (' ' + `WHERE id = '${req.params.songId}';`)
    }
}

export default new Update
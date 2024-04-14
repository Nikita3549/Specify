import mysql from 'mysql2/promise';
import {TypeSendStatusFull} from "../globalTypes/types/sendStatus";
import Status from "../globalTypes/enums/status";

class ClassDBConnection {
    DBConnection: any

    constructor() {
        this.DBConnection = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        })
    }

    public sendQuery(queryBody: string): Promise<any>{
        return new Promise(async (resolve, reject) => {
            try {
                await this.DBConnection.then((conn: any) => conn.query(queryBody))
                    .then(([rows]: Array<unknown>) => {
                        resolve(rows)
                    })
            } catch (err){
                reject({ status: Status.Error, message: 'DB connection error', errObject: err})
            }
        })
    }
}

export default new ClassDBConnection();
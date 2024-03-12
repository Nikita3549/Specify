import mysql from 'mysql2/promise';
import {TypeSendStatusFull} from "../models/types/sendStatus";

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
        return new Promise(async (resolve, reject): Promise<any> => {
            try {
                await this.DBConnection.then((conn: any) => conn.query(queryBody))
                    .then(([rows]: Array<any>): void => {
                        resolve(rows)
                    })

            } catch (err){
                reject({ status: 'error', message: 'DB connection error', errObject: err})
            }
        })
    }
}

export default new ClassDBConnection();
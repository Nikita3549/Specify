import mysql, { Pool } from 'mysql2';

class ClassDBConnection {
    promisePool: any

    constructor() {
        const pool: Pool = mysql.createPool({
            connectionLimit: 10,
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        })
        this.promisePool = pool.promise()
    }

    public sendQuery<ServerResponse>(queryBody: string): Promise<ServerResponse | any>{
        return new Promise(async (resolve, reject) => {
            try {
                const [ rows ]: ServerResponse[] = await this.promisePool.query(queryBody)

                resolve(rows)
            } catch (err){
                reject(Error('DB connection error'))
            }
        })
    }
}

export default new ClassDBConnection();
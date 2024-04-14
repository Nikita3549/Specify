import DBConnection from "../../../DBConnection";
import { v4 as uuid } from "uuid"

class QueryBody{
    mandatorySongProperties: string[]

    constructor() {
        this.mandatorySongProperties = ["id", "duration", "filePath", "mimeType", "title", "uploaded"]
    }

    public async create(req: any, res: any): Promise<string>{
        let query: string = 'INSERT INTO songs ' + await this.parametrsInBrackets(req, res) + await this.getValues(req, res)

        return query
    }
    private async getValues(req: any, res: any): Promise<string>{
        let query: string = ` VALUES ('${req.cookies.userToken}'`

        query += `,'${uuid()}'`
        query += `,'${req.body.duration}'`
        query += `,'${req.file.path}'`
        query += `,'${req.file.mimetype}'`
        query += `,'${req.body.title}'`
        query += `,'${new Date().toLocaleDateString('ru-Ru')}'`

        if (req.body?.genre) query += `,'${req.body.genre}'`
        if (req.body?.lyrics) query += `,'${req.body.lyrics}'`

        return query + ');'
    }
    private async parametrsInBrackets(req: any, res: any): Promise<string>{
        let query: string = ''

        if (await this.isAuthorIdValid(req.cookies.userToken)){
            query += '(authorId'
        } else{
            throw new Error('author doesn\'t exist')
        }

        this.mandatorySongProperties.forEach((item: string) => {
            query += `,${item}`
        })

        if (req.body?.genre) query += ',genre'
        if (req.body?.lyrics) query += ',lyrics'

        return query + ')'
    }
    private async isAuthorIdValid(authorId: string): Promise<boolean>{
        const dbResponse = (await DBConnection.sendQuery(`SELECT email FROM users WHERE id = '${authorId}' and isArtist = 'true'`))[0]?.email
        return dbResponse !== undefined
    }
}

export default QueryBody
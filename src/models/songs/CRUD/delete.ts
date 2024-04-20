import DBConnection from "../../DBConnection";
import httpStatus from "../../../globalTypes/enums/httpStatus";
import fs from "fs/promises";

class Delete{
    DBConnection: any
    fs: any

    constructor() {
        this.DBConnection = DBConnection
        this.fs = fs
    }

    public async handle(req: any, res: any){
        try{
            const filePath: string = await this.filePath(req, res)

            await this.DBConnection.sendQuery(`DELETE FROM songs WHERE id = '${req.params.songId}'`)
                .then(() => {
                    this.fs.unlink(filePath)
                    res.status(httpStatus.NoContent).send()
                }, (_err: any) => {
                    res.status(httpStatus.InternalServerError).send()
                })
            }
        catch (_err){
            res.status(httpStatus.NotFound).send('song doesn\'t exist')
        }

    }

    private async filePath(req: any, _res: any): Promise<string>{
        return (await this.DBConnection.sendQuery(`SELECT filePath FROM songs WHERE id = '${req.params.songId}'`))[0].filePath

    }

}

export default new Delete();
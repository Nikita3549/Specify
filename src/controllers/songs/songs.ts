import songs from "../../models/songs";
import httpStatus from "../../globalTypes/enums/httpStatus";
import interfaceSendStream from "../../models/songs/CRUD/sendStream/interfaceSendStream";

class Songs{
    stream: interfaceSendStream

    constructor() {
        this.stream = new songs.GetStream
    }

    private doesRequestBodyExist(req: any, res: any): boolean{
        if (Object.keys(req.body).length === 0){
            res.status(httpStatus.BadRequest).send()
            return false
        }
        return true
    }
    public async getStream(req: any, res: any){
        try{
            await this.stream.start(req, res)
        } catch (err){
            console.log(err)
        }
    }
    public upload(req: any, res: any){
        this.doesRequestBodyExist(req, res) && songs.uploadSong.handle(req, res)
    }
    public update(req: any, res: any){
        this.doesRequestBodyExist(req, res) && songs.update.handle(req, res)
    }
    public delete(req: any, res: any){
        songs.deleteSong.handle(req, res)
    }
    public getDataById(req: any, res: any){
        songs.getDataById.handle(req, res)
    }
}

export default new Songs
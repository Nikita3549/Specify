import httpStatus from "../../../../globalTypes/enums/httpStatus";
import fsPromises from "fs/promises";
import fs from "fs";
import DBConnection from "../../../DBConnection";

import { Request, Response} from "express";
import { Stats } from "fs";
import Chunk from "./interfaces/Chunk";
import SongData from "./interfaces/SongData"
import Stream from "./interfaces/Stream";

class SendStream {
   chunk: Chunk
   songData: SongData

   public async start(req: Request, res: Response){
      await this.asyncConstructor(req, res)

      this.setHeaders(req, res)

      this.stream(req, res).start()
   }

   private stream(_req: Request, res: Response){
      const stream: Stream = {
         readStream: fs.createReadStream(this.songData.filePath),

         start(){
            this.readStream.pipe(res)
         }
      }
      return stream
   }
   private setHeaders(req: Request, res: Response){
      res.writeHead(httpStatus.PartialContent, {
         "Transfer-Encoding": "chunked",
         "Content-Range": `bytes ${this.chunk.start}-${this.chunk.end}/${this.chunk.total}`,
         "Accept-Ranges": "bytes",
         "Content-Length": this.chunk.size,
         "Content-Type": this.songData.mimeType
      })
   }

   private async asyncConstructor(req: Request, res: Response){
      this.songData = await this.getSongData(req, res)


      this.chunk = {
         positions: this.range(req, res).replace("bytes=", "").split("-")
      }
      this.chunk.total = await this.filesize(req, res)
      this.chunk.start = parseInt(this.chunk.positions[0], 10)
      this.chunk.end = this.chunk.positions[1] ? parseInt(this.chunk.positions[1], 10) : this.chunk.total - 1
      this.chunk.size = (this.chunk.end - this.chunk.start) + 1
   }

   private async getSongData(req: Request, res: Response): Promise<SongData>{
      return new Promise( async (resolve, reject) => {
         await DBConnection.sendQuery(`SELECT * FROM songs WHERE id = '${req.params.songId}';`)
            .catch(() => {
                res.status(httpStatus.InternalServerError).send()
                reject(new Error('Internal server error'))
             })

             .then((rows) => {
                if (rows.length == 0){
                   res.status(httpStatus.BadRequest).send()
                   reject(new Error('id isn\'t valid'))
                }
                resolve(rows[0])
             })
      })
   }

   private filesize(req: Request, res: Response): Promise<number>{
      return new Promise( (resolve, reject) => {
         fsPromises.stat('songs/song.mp3')

             .catch(() => {
                res.status(httpStatus.InternalServerError).send()
                reject(new Error('internal server error'))
             })

             .then((rows: Stats | void) => {
                if (rows) resolve(rows.size)
             })
      })
   }

   private range(req: Request, res: Response){
      if (!req.headers.range){
         res.status(httpStatus.RangeNotSatisfiable).send()
         throw new Error('range is not satisfiable')
      }
      return req.headers.range
   }
}

export default SendStream
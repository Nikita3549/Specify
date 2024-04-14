import Chunk from "./interfaces/Chunk";
import SongData from "./interfaces/SongData"
import { Request, Response} from "express";

export default interface interfaceSendStream{
    chunk: Chunk,
    songData: SongData,
    start: (req: Request, res: Response) => void
}
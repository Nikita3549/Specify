import { Request, Response} from "express";
import search from "../../models/search";
import httpStatus from "../../globalTypes/enums/httpStatus";

class Search {
    byParam(req: Request, res: Response){
        const param: string = req.params.searchParam

        if (param == 'undefined' || param == 'null'){
            res.status(httpStatus.BadRequest).send()
            return
        }
        search.songsOrPlaylist.byParam(req, res, param)
    }
}

export default new Search()
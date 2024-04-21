import search from "../../controllers/search/search";

export default function (router: any): void {
    router.get('/search/:searchParam', (req: any, res: any): void => {
        search.byParam(req, res);
    })
}
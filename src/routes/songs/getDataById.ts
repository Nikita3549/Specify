import songs from "../../controllers/songs/songs";

export default function (router: any): void {
    router.get('/songs/:songId/getData', (req: any, res: any): void => {
        songs.getDataById(req, res);
    })
}

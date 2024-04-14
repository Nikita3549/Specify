import songs from "../../../controllers/songs/songs";

export default function (router: any): void {
    router.get('/songs/:songId/getStream', (req: any, res: any): void => {
        songs.getStream(req, res);
    })
}
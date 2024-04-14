import songs from "../../../controllers/songs/songs";

export default function (router: any): void {
    router.delete('/songs/:songId/delete', (req: any, res: any): void => {
        songs.delete(req, res);
    })
}
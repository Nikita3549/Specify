import songs from "../../../controllers/songs/songs";
import isAuthorForSong from "../../../middlewares/isAuthor/isAuthorForSong";

export default function (router: any): void {
    router.delete('/songs/:songId/delete', isAuthorForSong, (req: any, res: any): void => {
        songs.delete(req, res);
    })
}
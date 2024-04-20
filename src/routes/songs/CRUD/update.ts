import songs from "../../../controllers/songs/songs";
import isAuthorForSong from "../../../middlewares/isAuthor/isAuthorForSong";

export default function (router: any): void {
    router.post('/songs/:songId/update', isAuthorForSong, (req: any, res: any): void => {
        songs.update(req, res);
    })
}

/*
* Updatable data:
* {
*   "title": "newTitle",
*   "genre": "newGenre",
*   "lyrics": "newLyrics"
* }
* */
import songs from "../../../controllers/songs/songs";

export default function (router: any): void {
    router.post('/songs/:songId/update', (req: any, res: any): void => {
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
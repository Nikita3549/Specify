import songs from "../../../controllers/songs/songs";
import multer from "multer";
import fs from "fs";

const upload: multer.Multer = multer({ dest: `songs/${new Date().toLocaleDateString('ru-Ru')}`, limits: {
        fieldSize: 10 * 1024 * 1024
    }})

export default function (router: any): void {
    router.post('/songs/uploadSong', upload.single("song"), (req: any, res: any): void => {
        songs.upload(req, res);
    })
}

/*
POST http://localhost:3000/songs/uploadSong
Cookie: userToken=957c8a0e-0f2b-439e-b320-55fe58ce9bcb
Content-Type: multipart/form-data; boundary=boundary

--boundary
Content-Disposition: form-data; name="song"; filename="song.mp3"
Content-Type: audio/mpeg

< songs/song.mp3

--boundary
Content-Disposition: form-data; name="title"
Content-Type: text/plain

titleExample

--boundary
Content-Disposition: form-data; name="duration"
Content-Type: text/plain

durationExample

--boundary
Content-Disposition: form-data; name="genre"
Content-Type: text/plain

?genreExample
--boundary
Content-Disposition: form-data; name="lyrics"
Content-Type: text/plain

?lyricsExample
--boundary--
* */
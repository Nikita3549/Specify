import SendStream from "./CRUD/sendStream/sendStream";
import uploadSong from "./CRUD/upload/upload";
import deleteSong from "./CRUD/delete"
import update from "./CRUD/update";
import getDataById from "./getDataById";

export default {
    GetStream: SendStream,
    uploadSong,
    deleteSong,
    update,
    getDataById
}
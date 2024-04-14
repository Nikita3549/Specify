export default interface songData {
    id: string,
    authorId: string,
    filePath: string,
    mimeType: string,
    title: string,
    duration: string,
    genre?: string,
    lyrics?: string,
    uploaded: string
}
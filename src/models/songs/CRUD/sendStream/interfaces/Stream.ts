import { ReadStream } from "node:fs";

export default interface stream{
    readStream: ReadStream,
    start: () => void
}
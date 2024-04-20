import router from "./routes";
import isSetCookies from "./middlewares/isSetCookies/isSetCookies";
import express from "express";
import { Express } from "express";
import cookieParser from "cookie-parser";

export default function createServer(): Express {
    const app: Express = express();
    app.disable('x-powered-by')

    app.use(express.urlencoded( { extended: false }))
    app.use(express.json())
    app.use(cookieParser())
    app.use(isSetCookies)
    app.use(router)
    app.use(express.static('../public'))

    return app
}
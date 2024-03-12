import express from 'express'
import cookieParser from 'cookie-parser';
import router from './routes'
const app = express();

app.use(express.urlencoded( { extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(express.static('../public'))
app.use(router)

export default app
import { Router } from 'express';
import TypeRoute from "../globalTypes/types/routes";
import auth from './user';
import songs from "./songs";

const router = Router()
const index: Array<TypeRoute> = [
    ...auth,
    ...songs
]

index.forEach((element) => {
    element(router)
})

export default router;
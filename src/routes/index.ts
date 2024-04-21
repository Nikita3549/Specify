import { Router } from 'express';
import TypeRoute from "../globalTypes/types/routes";
import auth from './user';
import songs from "./songs";
import search from "./search";

const router = Router()
const index: Array<TypeRoute> = [
    ...auth,
    ...songs,
    ...search
]

index.forEach((element) => {
    element(router)
})

export default router;
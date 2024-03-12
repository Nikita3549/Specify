import { Router } from 'express';
import auth from './auth';

const router = Router()

auth.forEach((element): void => {
    element(router)
})

export default router;
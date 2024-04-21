import supertest from "supertest";
import {Express} from "express";
import DBConnection from "../../models/DBConnection";
import createServer from "../../createServer";

const app: Express = createServer()

async function getCookie(): Promise<string>{
    const [{authorId: cookie}] = await DBConnection.sendQuery(`SELECT authorId FROM songs LIMIT 1`)
    return cookie
}

describe('search by params', () => {
    afterAll(async () => {
        await DBConnection.promisePool.end()
    })

    describe('ok situation', () => {
        it('should return 200', async () => {
            const [{title}] = await DBConnection.sendQuery(`SELECT title FROM songs LIMIT 1`)

            await supertest(app)
                .get(`/search/${title}`)
                .set('Cookie', [
                    `userToken=${await getCookie()}`
                ])
                .expect(200)
        })
    })
    describe('non-exist song name',  () => {
        it('should return 404', async () => {
            await supertest(app)
                .get(`/search/nonExistName`)
                .set('Cookie', [
                    `userToken=${await getCookie()}`
                ])
                .expect(404)
        })
    })
    describe('null song name', () => {
        it('should return 404', async () => {
            await supertest(app)
                .get(`/search/null`)
                .set('Cookie', [
                    `userToken=${await getCookie()}`
                ])
                .expect(400)
        })
    })
    describe('undefined song name',  () => {
        it('should return 404', async () => {
            await supertest(app)
                .get(`/search/undefined`)
                .set('Cookie', [
                    `userToken=${await getCookie()}`
                ])
                .expect(400)
        })
    })

})
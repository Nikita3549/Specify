import supertest from "supertest";
import {Express} from "express";
import createServer from "../../createServer";
import DBConnection from "../../models/DBConnection";

const app: Express = createServer()

describe('email', () => {
    afterAll(async () => {
        await DBConnection.promisePool.end()
    })

    describe('are email and password valid', () => {
        describe('ok', () => {
            it('should return 200', async () => {
                const { email, password } = (await DBConnection.sendQuery(`SELECT email, password FROM users LIMIT 1`))[0]

                await supertest(app).get('/user/isExist')
                    .send({ email: email, password: password})
                    .expect(200)
            })
        })
        describe('empty request body', () => {
            it('should return 400', async () => {
                await supertest(app).get('/user/isExist').expect(400)
            })
        })
        describe('given wrong email', () => {
            it('should return 404', async () => {
                const password = (await DBConnection.sendQuery(`SELECT password FROM users LIMIT 1`))[0].password

                await supertest(app).get('/user/isExist')
                    .send({ email: 'emailThatDoesntExist@gmail.com', password: password})
                    .expect(404)
            });
        })
        describe('given wrong password', () => {
            it('should return 404', async () => {
                const email = (await DBConnection.sendQuery(`SELECT email FROM users LIMIT 1`))[0].email

                await supertest(app).get('/user/isExist')
                    .send({ email: email, password: 'wrongPassword'})
                    .expect(404)
            });
        })
        describe('overkill with foreign params without mandatory params', () => {
            it('should return 400', async ()=> {
                await supertest(app).get('/user/isExist')
                    .send({"foreignEmail": "testemail@gmail.com", "foreignPassword": "testpassword", "foreignParam": 'something'})
                    .expect(400)
            })
        })
        describe('foreign params', () => {
            it('should return 400', async ()=> {
                await supertest(app).get('/user/isExist')
                    .send({"foreignParam1": "testemail@gmail.com", "foreignParam2": "testpassword"})
                    .expect(400)
            })
        })
        describe('overkill of params but with mandatory params', () => {
            it('should return 400', async () => {
                await supertest(app).get('/user/isExist')
                    .send({"email": "testemail@gmail.com", "password": "testpassword", "foreignParam": 'something'})
                    .expect(400)
            })
        })
    })
})

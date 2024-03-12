import user from "../../../controllers/auth/user";

export default function (router: any): void {
    router.post('/user/updateUser', (req: any, res: any): void => {
        user.updateUser(req, res)
    })
}
/*
* REQUIRE DATA:
* DATA THAT SHOULD BE UPDATED:
* email?: 'string',
* settings?: -- OBJECT(json) WITH ALL UPDATED PROPERTIES
* others...
* */
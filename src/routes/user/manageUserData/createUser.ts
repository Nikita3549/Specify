import user from "../../../controllers/user/user";

export default function (router: any): void {
    router.post('/user/create', (req: any, res: any): void => {
        user.createUser(req, res);
    })
}
/**
 * REQUIRE DATA: {
 *     "password": "testpassword",
 *     "email": "testemail@gmail.com",
 *     "realName": "Name",
 *     "realSecondName": "secondName",
 *     "gender": "male",
 *     "region": "Belarus",
 *     "isArtist": "false",
 *     "settings": {
 *         "exampleSettings": "true"
 *     }
 * }
**/
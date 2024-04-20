import user from "../../../controllers/user/user";

export default function (router: any): void {
    router.get('/user/isExist', (req: any, res: any): void => {
        user.isValidPasswordAndEmail(req, res);
    })
}
/*
* REQUIRE DATA:
* email: 'string'
* password: 'string'*/
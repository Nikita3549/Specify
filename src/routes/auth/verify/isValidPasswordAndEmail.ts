import user from "../../../controllers/auth/user";

export default function (router: any): void {
    router.post('/user/isExist', (req: any, res: any): void => {
        user.isValidPasswordAndEmail(req, res);
    })
}
/*
* REQUIRE DATA:
* email: 'string'
* password: 'string'*/
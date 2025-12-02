import user from "../../../controllers/user/user";

export default function (router: any): void {
    router.post('/user/leave', (req: any, res: any): void => {
        user.leaveAccount(req, res);
    })
}
import createUser from "./manageUserData/createUser";
import UpdateUser from "./manageUserData/updateUser";
import isValidPasswordAndEmail from "./verify/doesValidPasswordAndEmail";
import doesEmailExist from "./verify/doesEmailExist";
import leaveAccount from "./account/leaveAccount";

export default {
    createUser,
    updateUser: UpdateUser,
    isValidPasswordAndEmail,
    isEmailExist: doesEmailExist,
    leaveAccount
}
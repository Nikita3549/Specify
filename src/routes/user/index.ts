import createUser from "./manageUserData/createUser";
import deleteUser from "./manageUserData/deleteUser";
import updateUser from "./manageUserData/updateUser";
import isValidPasswordAndEmail from "./verify/isValidPasswordAndEmail";
import leaveAccount from "./account/leaveAccount";


export default [createUser, deleteUser, updateUser, isValidPasswordAndEmail, leaveAccount]
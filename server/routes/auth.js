import {addUser,changepassword,forgot_password,signin, verifyresettoken} from "../controllers/auth.js"
import { add_roles } from "../controllers/roles.js";
import protectAdmin from '../middlewares/protectAdmin.js'
import protect from '../middlewares/protect.js'
import express from "express"

const router = express.Router();

router.post("/auth/signin",signin);
router.route("/auth/adduser").post(protectAdmin,addUser);
router.route("/auth/forgotpassword").post(forgot_password)
router.route("/auth/changepassword").post(protect,changepassword)
router.route("/auth/resetpassword/:token").put(verifyresettoken)
// router.post('/addroles',add_roles)

export default router
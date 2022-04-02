import { fetsh_all, getUserInfo } from "../controllers/users.js";
import protectAdmin from "../middlewares/protectAdmin.js";
import express from 'express'


const router = express.Router();
router.route("/allusers").get(protectAdmin,fetsh_all);
router.route('/usermeta').get(protectAdmin,getUserInfo);

export default router
import {addUser,signin} from "../controllers/auth.js"

import express from "express"

const router = express.Router();

router.post("/signin",signin);
router.post("/adduser",addUser);

export default router
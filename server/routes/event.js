import { addEvent } from "../controllers/event.js";
import protectAdmin from '../middlewares/protectAdmin.js'
import protect from '../middlewares/protect.js'
import express from 'express'
import { fetshallevents ,fetshuserevents,deleteEvent} from "../controllers/event.js";

const router = express.Router()

router.route('/events/delete').post(protectAdmin,deleteEvent);
router.route('/events/addevent').post(protectAdmin,addEvent);
router.route('/events/all').get(protectAdmin,fetshallevents);
router.route('/events/user').get(protect,fetshuserevents)
export default router

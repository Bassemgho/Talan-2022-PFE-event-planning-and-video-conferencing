import { addEvent } from "../controllers/event.js";
import express from 'express'

const router = express.Router()

router.route('/events/addevent').post(addEvent);
router.route('/events/all')
export default router
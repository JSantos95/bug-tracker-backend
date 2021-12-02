import { find, create } from "../controllers/company";
import { Router } from "express";

const router = Router();

router.route('/').get(find);
router.route('/add').post(create);

module.exports = router;
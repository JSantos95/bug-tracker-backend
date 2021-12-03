import { find, create, join, deleteCompany } from "../controllers/company";
import { Router } from "express";

const router = Router();

router.route('/').get(find);
router.route('/add').post(create);
router.route('/join/:id').post(join);
router.route('/delete/:id').delete(deleteCompany);

module.exports = router;
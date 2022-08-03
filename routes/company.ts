import { getAllCompanies, create, update, deleteCompany, findCompanyById } from "../controllers/company";
import { Router } from "express";

const router = Router();

router.route('/').get(getAllCompanies);
router.route('/:id').get(findCompanyById);
router.route('/').post(create);
router.route('/:id').put(update);
router.route('/:id').delete(deleteCompany);

module.exports = router;
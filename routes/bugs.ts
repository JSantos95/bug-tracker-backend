const router = require('express').Router();
import { getAll, getById, getUserBugs, create, update, deleteBug } from '../controllers/bug';

//READ
router.route('/').get(getAll)
router.route('/:id').get(getById);
router.route('/user/:name').get(getUserBugs);

//CREATE 
router.route('/add').post(create);

//UPDATE
router.route('/update/:id').post(update)

//DELETE 
router.route('/:id').delete(deleteBug);

module.exports = router;
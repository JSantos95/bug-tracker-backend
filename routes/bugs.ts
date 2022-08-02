const router = require('express').Router();
import { getAll, getById, getAllBugByToken, getUserBugs, create, update, deleteBug } from '../controllers/bug';

//READ
router.route('/').get(getAll)
router.route('/:id').get(getById);
router.route('/user/token/:token').get(getAllBugByToken);
router.route('/user/:name').get(getUserBugs);

//CREATE 
router.route('/').post(create);

//UPDATE
router.route('/').put(update);

//DELETE 
router.route('/:id').delete(deleteBug);

module.exports = router;
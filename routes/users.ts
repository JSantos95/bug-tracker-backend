import { Request, Response, Router } from "express";
const router = Router();
const User = require('../models/user.model');

router.route('/').get((req: Request, res: Response) => {
    User.find()
        .then((user: any) => res.json(user))
        .catch((err: any) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req: Request, res: Response) => {
    const username = req.body.username;
    const newUser = new User({ username });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch((err: any) => res.status(400).json('Error: ' + err));
});

module.exports = router;
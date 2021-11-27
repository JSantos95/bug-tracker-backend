import { Request, Response, Router } from "express";
const Company = require('../models/company.model');
const router = Router();


router.route('/').get((req: Request, res: Response) => {
    Company.find()
        .then((user: any) => res.json(user))
        .catch((err: any) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req: Request, res: Response) => {
    const companyname = req.body.companyname;
    const newCompany = new Company({ companyname });

    newCompany.save()
        .then(() => res.json('User added!'))
        .catch((err: any) => res.status(400).json('Error: ' + err));
});

module.exports = router;
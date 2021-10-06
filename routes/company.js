const router = require('express').Router();
const Company = require('../models/company.model');

router.route('/').get((req, res) => {
    Company.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const companyname = req.body.companyname;
    const newCompany = new Company({ companyname });

    newCompany.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
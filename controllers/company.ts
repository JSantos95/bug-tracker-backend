import { Request, Response } from "express";

const Company = require('../models/Company');

export const find = (req: Request, res: Response) => {
    Company.find()
        .then((user: any) => res.json(user))
        .catch((err: any) => res.status(400).json('Error: ' + err));
}

export const create = (req: Request, res: Response) => {
    const companyname = req.body.companyname;
    const newCompany = new Company({ companyname });

    newCompany.save()
        .then(() => res.json('User added!'))
        .catch((err: any) => res.status(400).json('Error: ' + err));
};
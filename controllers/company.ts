import { Request, Response } from "express";

const Company = require('../models/Company');

//Read
export const find = (req: Request, res: Response) => {
    Company.find()
        .then((user: any) => res.json(user))
        .catch((err: any) => res.status(400).json('Error: ' + err));
}

export const findCompanyById = (req: Request, res: Response) => {
    Company.findById(req.params.id)
        .then((user: any) => res.json(user))
        .catch((err: any) => res.status(400).json('Error: ' + err));
}

//Create
export const create = (req: Request, res: Response) => {
    const newCompany = new Company({
        companyName: req.body.companyName,
        owner: req.body.username,
        members: [req.body.username],
    });

    newCompany.save()
        .then(() => res.json('Company added!'))
        .catch((err: any) => res.status(400).json('Error: ' + err));
};

//Update
export const join = (req: Request, res: Response) => {
    Company.findByIdAndUpdate(req.params.id)
        .then((company: any) => {
            company.members = [...company.members, req.body.username];

            company.save()
                .then(() => res.json('Company Updated!'))
                .catch((err: any) => res.status(400).json('Error: ' + err));
        })
        .catch((err: any) => res.status(400).json('Error: ' + err));
}

export const deleteCompany = (req: Request, res: Response) => {
    Company.findByIdAndDelete(req.params.id)
        .then(() => res.json('Bug deleted'))
        .catch((err: any) => res.status(400).json('Error: ' + err));
}
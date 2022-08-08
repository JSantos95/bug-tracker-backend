import { Request, Response } from "express";
import { Company as CompanySchema, User as UserSchema } from '../interface';
import jwt, { JwtPayload } from 'jsonwebtoken';

const Company = require('../models/Company');
const User = require('../models/User');

//Read
export const getAllCompanies = (req: Request, res: Response) => {
    Company.find()
        .then((company: CompanySchema[]) => res.json(company))
        .catch((err: any) => res.status(400).json('Error: ' + err));
}

export const findCompanyById = (req: Request, res: Response) => {
    Company.findById(req.params.id)
        .then((company: CompanySchema) => res.json(company))
        .catch((err: any) => res.status(400).json('Error: ' + err));
}

export const findCompanyByToken = (req: Request, res: Response) => {
    const token = req.params.token;
    const payload = jwt.decode(token) as JwtPayload;
    User.findById(payload.id)
        .then((user: UserSchema) => {
            Company.findById(user.companyId)
                .then((company: CompanySchema) => res.json(company))
                .catch((err: any) => res.status(400).json('Error finding company with id ' + err));
        })
        .catch((err: any) => res.status(400).json('Error decoding token: ' + err));
}

//Create
export const create = (req: Request, res: Response) => {
    const newCompany = new Company({
        companyName: req.body.companyName,
        ownerId: req.body.id
    });

    newCompany.save()
        .then(() => res.json('Company added!'))
        .catch((err: any) => res.status(400).json('Error: ' + err));
};

//Update
export const update = (req: Request, res: Response) => {
    Company.findByIdAndUpdate(req.params.id)
        .then((company: CompanySchema) => {
            company.companyName = req.body.companyName;
            company.ownerId = req.body.ownerId;

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
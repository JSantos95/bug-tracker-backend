import { Request, Response } from "express";
import { Bug as BugType, User as UserType } from '../interface';
import jwt, { JwtPayload } from 'jsonwebtoken';

const Bug = require('../models/Bug');

//READ
export const getAll = (req: Request, res: Response) => {
    Bug.find()
        .then((bug: BugType[]) => res.json(bug))
        .catch((err: any) => res.status(400).json('Error: lol ' + err));
};

export const getById = (req: Request, res: Response) => {
    Bug.findById(req.params.id)
        .then((bug: BugType) => res.json(bug))
        .catch((err: any) => res.status(400).json('Error: ' + err));
};

export const getUserBugs = (req: Request, res: Response) => {
    const name = req.params.name;
    Bug.find({
        $or: [
            { "reporterId": name },
            { "assigneeId": name },
            { "status": "Unassigned" },
            { "company": req.body.companyId ? req.body.companyId : "" }
        ]
    })
        .then((bug: BugType[]) => res.json(bug))
        .catch((err: any) => res.status(400).json('Error: ' + err));
};

export const getAllBugByToken = (req: Request, res: Response) => {
    const { id } = jwt.decode(req.params.token) as JwtPayload;
    Bug.find({
        $or: [
            { reporterId: id },
            { assigneeId: id }
        ]
    })
        .then((bug: any) => res.json(bug))
        .catch((err: any) => res.status(400).json('Error: ' + err))
};

//CREATE 
export const create = (req: Request, res: Response) => {
    const bugName = req.body.bugName;
    const type = req.body.type;
    const reporterId = req.body.reporterId;
    const description = req.body.description;
    const status = req.body.assginee ? 'To Do' : 'Unassigned';
    const priority = req.body.priority;
    const assigneeId = req.body.assigneeId ? req.body.assigneeId : '';
    const companyId = req.body.companyId ? req.body.companyId : '';

    const newBug = new Bug({
        bugName,
        type,
        description,
        status,
        priority,
        reporterId,
        assigneeId,
        companyId,
    })

    newBug.save()
        .then(() => res.json('Bug added!'))
        .catch((err: any) => res.status(400).json('Error: ' + err));
};

//UPDATE
export const update = (req: Request, res: Response) => {
    Bug.findByIdAndUpdate(req.body._id)
        .then((bug: BugType) => {
            bug.bugName = req.body.bugName;
            bug.type = req.body.type;
            bug.description = req.body.description;
            bug.status = req.body.status;
            bug.reporterId = req.body.reporterId;
            bug.assigneeId = req.body.assigneeId;
            bug.priority = req.body.priority;

            bug.save()
                .then(() => res.json('Bug Updated!'))
                .catch((err: any) => res.status(400).json('Error: ' + err));
        })
        .catch((err: any) => res.status(400).json('Error ' + err));
};

//DELETE 
export const deleteBug = (req: Request, res: Response) => {
    Bug.findByIdAndDelete(req.params.id)
        .then(() => res.json('Bug deleted'))
        .catch((err: any) => res.status(400).json('Error: ' + err));
};
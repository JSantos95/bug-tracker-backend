import { Request, Response } from "express";
import { Bug as BugType } from '../interface';
const Bug = require('../models/Bug');

//READ
export const getAll = (req: Request, res: Response) => {
    Bug.find()
        .then((bug: any) => res.json(bug))
        .catch((err: any) => res.status(400).json('Error: lol ' + err));
};

export const getById = (req: Request, res: Response) => {
    Bug.findById(req.params.id)
        .then((bug: any) => res.json(bug))
        .catch((err: any) => res.status(400).json('Error: ' + err));
};

export const getUserBugs = (req: Request, res: Response) => {
    const name = req.params.name;
    console.log(name);
    Bug.find({
        $or: [
            { "reporter": name },
            { "assginee": name },
            { "status": "Unassigned" },
        ]
    })
        .then((bug: any) => res.json(bug))
        .catch((err: any) => res.status(400).json('Error: ' + err));
};

//CREATE 
export const create = (req: Request, res: Response) => {
    const bugName = req.body.bugName;
    const type = req.body.type;
    const reporter = req.body.reporter;
    const description = req.body.description;
    const status = req.body.assginee ? 'To Do' : 'Unassigned';
    const priority = req.body.priority;
    const assginee = req.body.assginee ? req.body.assginee : '';

    const newBug = new Bug({
        bugName,
        type,
        description,
        status,
        priority,
        reporter,
        assginee,
    })

    newBug.save()
        .then(() => res.json('Bug added!'))
        .catch((err: any) => res.status(400).json('Error: ' + err));
};

//UPDATE
export const update = (req: Request, res: Response) => {
    Bug.findByIdAndUpdate(req.params.id)
        .then((bug: BugType) => {
            bug.bugName = req.body.bugName;
            bug.type = req.body.type;
            bug.description = req.body.description;
            bug.status = req.body.status;
            bug.reporter = req.body.reporter;
            bug.assignee = req.body.assignee;
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
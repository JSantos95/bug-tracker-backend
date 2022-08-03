import mongoose from 'mongoose';
import { Bug as BugSchema } from '../interface';

const Schema = mongoose.Schema;


const bugSchema = new Schema<BugSchema>({
    bugName: { type: String, required: true, },

    //type: Bug / Task / Feature
    type: { type: String, required: true },
    description: { type: String, required: false },

    //status: Unassigned -> To Do -> In Progress -> QA -> Complete 
    status: { type: String, required: true, },

    //priority: low - med - high
    priority: { type: String, required: true, },
    reporterId: { type: String, required: true, },
    assigneeId: { type: String, required: false, },
}, {
    timestamps: true,
});

const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug;
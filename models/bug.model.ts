import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const bugSchema = new Schema({
    bugName: { type: String, required: true, },
    //type: Bug / Task / Feature
    type: { type: String, required: true },
    description: { type: String, required: false },
    //status: Unassigned -> To Do -> In Progress -> QA -> Complete 
    status: { type: String, required: true, },
    //priority: low - med - high
    priority: { type: String, required: true, },
    reporter: { type: String, required: true, },
    assginee: { type: String, required: false, },
    company: { type: String, required: false, },
}, {
    timestamps: true,
});

const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug;
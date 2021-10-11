const router = require('express').Router();
const Bug = require('../models/bug.model');

//READ
router.route('/').get((req, res) => {
    Bug.find()
        .then(bug => res.json(bug))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Bug.findById(req.params.id)
        .then(bug => res.json(bug))
        .catch(err => res.status(400).json('Error: ' + err));
})

//CREATE 
router.route('/add').post((req, res) => {
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
        .catch(err => res.status(400).json('Error: ' + err));
});

//UPDATE
router.route('/update/:id').post((req, res) => {
    Bug.findByIdAndUpdate(req.params.id)
        .then(bug => {
            bug.bugName = req.body.bugName;
            bug.type = req.body.type;
            bug.description = req.body.description;
            bug.status = req.body.status;
            bug.reporter = req.body.reporter;
            bug.assignee = req.body.assignee;
            bug.priority = req.body.priority;

            bug.save()
                .then(() => res.json('Bug Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error ' + err));
})

//DELETE 
router.route('/:id').delete((req, res) => {
    Bug.findByIdAndDelete(req.params.id)
        .then(() => res.json('Bug deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
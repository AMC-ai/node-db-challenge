const express = require("express");

const db = require("./project-model");

const router = express.Router();

router.get('/', (req, res) => {
    db.get()
        .then(projects => {
            res
                .status(200)
                .json(projects);
        })
        .catch(error => {
            console.log('error on GET /projects', error);
            res
                .status(500)
                .json({ errorMessage: 'The projects information could not be retrieved.' });
        });
});

router.get("/:id", (req, res) => {
    db.getById(req.params.id)
        .then(project => {
            if (project) {
                res.status(200).json(project);
            } else {
                res
                    .status(404)
                    .json({ message: 'The project with the specified ID does not exist.' });
            }
        })
        .catch(error => {
            console.log('error on GET /project/:id', error);
            res
                .status(500)
                .json({
                    message: 'The project information could not be retrieved.',
                });
        });
});

//for projects and tasks if no value is provided for the completed property, the API should provide a default value of false.
//a project can have multiple tasks.
//when adding projects the client must provide a name, the description is optional.
router.post('/', (req, res) => {
    const projectData = req.body;
    console.log(projectData);
    const { name } = projectData
    if (!name) {
        res
            .status(400)
            .json({ errorMessage: 'Please provide REQUIRED name for the project.' })
    } else {
        db.insert(projectData)
            .then(project => {
                res
                    .status(201)
                    .json(project);
            })
            .catch(error => {
                console.log('error on POST project', error);
                res
                    .status(500)
                    .json({ error: 'There was an error while saving the project to the database.' })
            });
    };
});

//a task belongs to only one project.
router.get('/:id/tasks', (req, res) => {
    db.getTasks(req.params.id)
        .then(task => {
            if (task.length === 0) {
                res
                    .status(404)
                    .json({ message: 'The task with the specified ID does not exist.' });
            } else {
                res.status(200).json(task);
            }
        })
        .catch(error => {
            console.log('error on GET /:id/task', error);
            res
                .status(500)
                .json({
                    message: 'The task information could not be retrieved.',
                });
        });
});

//for projects and tasks if no value is provided for the completed property, the API should provide a default value of false.
//when adding a task the client must provide a description, the notes are optional.
//when adding a task the client must provide the id of an existing project.
router.post('/:id/tasks', (req, res) => {
    const id = req.params.id;
    const taskData = req.body;
    const { description } = taskData
    console.log('projects/tasks/: id', id);

    db.getById(id)
        .then(project => {
            console.log('tasks', project)
            console.log('tasks description', description)
            if (!project) {
                res
                    .status(404)
                    .json({ message: "The project with the specified ID does not exist." })
            } else if (!description) {
                res
                    .status(400)
                    .json({ errorMessage: "Please provide description for the task." })
            } else {
                console.log('post body', taskData)
                db.insertTask(id, taskData)
                    .then(note => {
                        res
                            .status(200)
                            .json(note)
                    })
                    .catch(error => {
                        console.log('error on POST /:id/posts', error);
                        res
                            .status(500)
                            .json({ error: "There was an error while saving the note to the database" });
                    });
            }
        });
});


module.exports = router;
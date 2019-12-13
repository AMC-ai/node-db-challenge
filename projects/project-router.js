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




module.exports = router;
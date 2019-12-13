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

module.exports = router;
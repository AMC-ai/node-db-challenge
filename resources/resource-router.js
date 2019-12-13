const express = require("express");

const db = require("./resource-model");

const router = express.Router();

router.get('/', (req, res) => {
    db.get()
        .then(resources => {
            res
                .status(200)
                .json(resources);
        })
        .catch(error => {
            console.log('error on GET /resources', error);
            res
                .status(500)
                .json({ errorMessage: 'The resources information could not be retrieved.' });
        });
});

//the same resource can be used in multiple projects.
router.get("/:id", (req, res) => {
    db.getById(req.params.id)
        .then(resource => {
            if (resource) {
                res.status(200).json(resource);
            } else {
                res
                    .status(404)
                    .json({ message: 'The resource with the specified ID does not exist.' });
            }
        })
        .catch(error => {
            console.log('error on GET /resource/:id', error);
            res
                .status(500)
                .json({
                    message: 'The resource information could not be retrieved.',
                });
        });
});

module.exports = router;
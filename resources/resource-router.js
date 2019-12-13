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

//when adding resources the client must provide a name, the description is optional.
router.post('/', (req, res) => {
    const resourceData = req.body;
    console.log(resourceData);
    const { name } = resourceData
    if (!name) {
        res
            .status(400)
            .json({ errorMessage: 'Please provide REQUIRED name for the resource.' })
    } else {
        db.insert(resourceData)
            .then(resource => {
                res
                    .status(201)
                    .json(resource);
            })
            .catch(error => {
                console.log('error on POST resource', error);
                res
                    .status(500)
                    .json({ error: 'There was an error while saving the resource to the database.' })
            });
    };
});

module.exports = router;
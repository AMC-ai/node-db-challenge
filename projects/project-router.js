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

module.exports = router;
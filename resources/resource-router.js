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

module.exports = router;
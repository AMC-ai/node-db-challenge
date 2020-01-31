const db = require("../data/db-config");

module.exports = {
    get,
    getById,
    insert
};

function get() {
    return db("resources");
};

function getById(id) {
    return db("resources")
        .where({ id })
        .first();
};

function insert(resource) {
    return db("resources")
        .insert(resource, "*")
        .then(([id]) => {
            return getById(id);
        });
};
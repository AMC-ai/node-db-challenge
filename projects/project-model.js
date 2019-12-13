const db = require("../data/db-config");

module.exports = {
    get,
    getById,
    insert,
    // getTaskById,
    // getTasks,
    // addTask
};

function get() {
    return db('projects');
};

function getById(id) {
    return db('projects')
        .where({ id })
        .first();
};

function insert(project) {
    return db('projects')
        .insert(project, 'id')
        .then(([id]) => {
            return getById(id)
        });
};
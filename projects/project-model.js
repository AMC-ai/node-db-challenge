const db = require("../data/db-config");

module.exports = {
    get,
    getById,
    insert,
    getTasks,
    insertTask
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


function getTasks(id) {
    return db("tasks")

};

function insertTask(id, task) {
    return db("tasks")
        .where({ project_id: id })
        .insert(task);
}
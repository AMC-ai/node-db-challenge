
exports.up = function (knex) {
    return (
        knex.schema
            //projects table
            .createTable("projects", tbl => {
                //unq id
                tbl.increments();

                // name is required
                tbl.string("name", 100)
                    .notNullable();
                //description
                tbl.string("description", 100);
                // boolean set to false 
                tbl.boolean("completed").defaultTo(false);
            })

            //tasks table
            .createTable("tasks", tbl => {
                //unq id
                tbl.increments();

                // description
                tbl.string("description", 100)
                    .notNullable();
                //additional notes colum
                tbl.string("notes", 800);
                //boolean set to false
                tbl.boolean("completed").defaultTo(false);
                //tasks has to be relational to only projects
                tbl
                    .integer("project_id")
                    .unsigned()
                    .notNullable()
                    .references("id")
                    .inTable("projects")
                    .onDelete("RESTRICT")
                    .onUpdate("CASCADE");
            })
            
};

exports.down = function (knex) {

};

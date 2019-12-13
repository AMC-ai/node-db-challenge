
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

            //resources table
            .createTable("resources", tbl => {
                //unq id
                tbl.increments();
                // name is required
                tbl.string("name", 100)
                    .notNullable();
                // description
                tbl.string("description", 100);
            })

            //projects resources table has to be relational to projects combining resources from its own table to multiple projects
            .createTable("projects_resources", tbl => {
                tbl.increments();
                //relational to projects
                tbl.integer("project_id")
                    .unsigned()
                    .notNullable()
                    .references("id")
                    .inTable("projects")
                    .onDelete("RESTRICT")
                    .onUpdate("CASCADE");
                //relational to resources
                tbl.integer("resource_id")
                    .unsigned()
                    .notNullable()
                    .references("id")
                    .inTable("resources")
                    .onDelete("RESTRICT")
                    .onUpdate("CASCADE");
            })
    );

};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('projects')
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('project_resources');
};

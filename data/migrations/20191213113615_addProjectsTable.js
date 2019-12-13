
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

            
};

exports.down = function (knex) {

};

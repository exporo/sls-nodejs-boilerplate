import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('failed_jobs', function (t) {
        t.increments('id').unsigned().primary();
        t.timestamps(false, true);
        t.string('name').nullable();
        t.string('payload').nullable();
        t.string('error').nullable();
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('failed_jobs');
}


import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('users', function (t) {
        t.increments('id').unsigned().primary();
        t.timestamps(false, true);
        t.string('name').nullable();
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('users');
}


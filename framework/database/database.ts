import * as Knex from 'knex'

const config = require('../../application/config/db.ts');

export const database = Knex(config as Knex.Config);


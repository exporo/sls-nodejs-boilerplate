import * as Knex from 'knex'

const config = require( '../../application/config/db.js');

export const database = Knex(config as Knex.Config);


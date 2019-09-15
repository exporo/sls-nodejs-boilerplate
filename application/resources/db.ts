import * as Knex from 'knex'

const config = require('../config/db.ts');

export const db = Knex(config as Knex.Config);


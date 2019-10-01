import * as Knex from 'knex'

const config = require('../../application/config/db.ts');

const currentConf = config.connections[process.env.AWS_LAMBDA_FUNCTION_NAME ? 'aws': 'docker'];

config.connection = currentConf;

console.log(config);

export const database = Knex(config as Knex.Config);


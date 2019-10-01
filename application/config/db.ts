require('ts-node/register');

const config = {
    client: 'mysql',
    debug: false,
    connection: {},
    connections: {
        docker: {
            host: 'mysql',
            user: 'homestead',
            password: 'secret',
            database: 'forge'
        },
        aws: {
            host: process.env.DB_HOST,
            user: 'forge',
            password: process.env.DB_PASSWORD,
            database: 'forge'
        }
    },
    seeds: {
        directory: '../database/seeds'
    },
    migrations: {
        tableName: 'migrations',
        directory: '../database/migrations'
    },
    timezone: 'UTC'
};

config.connection = config.connections[process.env.AWS_LAMBDA_FUNCTION_NAME ? 'aws' : 'docker'];

module.exports = config;
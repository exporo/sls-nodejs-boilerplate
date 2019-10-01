require('ts-node/register');

module.exports = {
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
            user: 'homestead',
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

require('ts-node/register');

module.exports = {
    client: 'mysql',
    debug: true,
    connection: {
        host: '127.0.0.1',
        user: 'homestead',
        password: 'secret',
        database: 'forge'
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

//host: process.env.DB_HOST,
//user: process.env.DB_USER,
//password: process.env.DB_PASSWORD,
//database: process.env.DB_DATABASE
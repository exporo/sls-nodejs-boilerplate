module.exports = {
    docker: {
        region: "eu-central-1",
        endpoint: "http://dynamodb:8000",
        tableName: "cache"
    },
    aws: {
        region: "eu-central-1",
        tableName: process.env.DYNAMODB_CACHE_TABLE
    }
};

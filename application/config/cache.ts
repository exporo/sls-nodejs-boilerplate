module.exports = {
    docker: {
        region: "eu-central-1",
        endpoint: "http://dynamodb:8000",
    },
    aws: {
        region: "eu-central-1",
        endpoint: process.env.DYNAMODB_CACHE_TABLE
    }
};

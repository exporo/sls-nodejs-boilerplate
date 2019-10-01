module.exports = {
    provider: 'local',
    local: {
        prefix: 'storage/'
    },
    s3: {
        region: "eu-central-1",
        bucket: process.env.AWS_BUCKET
    }
};
module.exports = {
    docker: {
        prefix: 'storage/'
    },
    s3: {
        region: "eu-central-1",
        bucket: process.env.AWS_BUCKET
    }
};
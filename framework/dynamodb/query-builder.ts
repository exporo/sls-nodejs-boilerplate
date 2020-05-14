export class QueryBuilder {
    private query: any;

    constructor(query) {
        this.query = {
            KeyConditionExpression: '',
            ExpressionAttributeNames: {},
            ExpressionAttributeValues: {},
        };

        if (Object.keys(query).length) {
            Object.keys(query).forEach(key => {
                this.addQuery({
                    key,
                    value: query[key],
                    op: 'and',
                });
            });
        }
    }

    public addQuery({ key, value, op }) {
        if (!this.query.KeyConditionExpression) {
            this.query.KeyConditionExpression = `#${key} = :${key}_value`;
        } else {
            this.query.KeyConditionExpression += ` ${op} #${key} = :${key}_value`;
        }

        this.query.ExpressionAttributeNames[`#${key}`] = key;
        this.query.ExpressionAttributeValues[`:${key}_value`] = value;
    }

    public get() {
        return this.query;
    }
}

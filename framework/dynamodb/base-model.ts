import { DynamoDB } from 'aws-sdk';
import Helper from '../helper';

export default class BaseModel<Schema> {
    private docClient: DynamoDB.DocumentClient;
    private region: string = process.env.REGION || 'us-east-1';

    protected tableName: string;

    constructor(tableName: string) {
        this.docClient = new DynamoDB.DocumentClient({
            region: this.region,
        });
        this.tableName = tableName || 'exporo';
    }

    findById(id: string): any {
        return new Promise((resolve, reject): void => {
            const params = {
                TableName: this.tableName,
                Key: { id },
            };
            this.docClient.get(params, (err, data) => {
                if (err) {
                    return reject(err);
                }

                resolve(data.Item);
            });
        });
    }

    findAll(
        limit?: number,
        lastKey?: string,
        sortBy?: string,
        sortDirection?: string,
        attributes?: any
    ): any {
        const isFetchAll = !limit && !lastKey;

        return new Promise((resolve, reject): void => {
            let params: any = {
                TableName: this.tableName,
            };
            let items = [];

            if (attributes) {
                params.ProjectionExpression = Object.keys(attributes).join(
                    ', '
                );
                params.ExpressionAttributeNames = attributes;
            }
            if (lastKey) {
                params.ExclusiveStartKey = { id: lastKey };
            }
            if (limit) {
                params.Limit = limit;
            }
            if (sortBy) {
                params.IndexName = `${sortBy}Index`;
                params.ScanIndexForward = !!sortDirection;
            }

            const onScan = (err, data) => {
                if (err) {
                    return reject(err);
                } else {
                    items = items.concat(data.Items);

                    if (data.LastEvaluatedKey && isFetchAll) {
                        params.ExclusiveStartKey = data.LastEvaluatedKey;
                        this.docClient.scan(params, onScan);
                    } else {
                        resolve(
                            limit
                                ? {
                                      data: items,
                                      lastKey: data.LastEvaluatedKey
                                          ? data.LastEvaluatedKey.id
                                          : null,
                                  }
                                : items
                        );
                    }
                }
            };

            this.docClient.scan(params, onScan);
        });
    }

    find(query: any): any {
        return new Promise((resolve, reject): void => {
            let params = {
                TableName: this.tableName,
                ...query,
            };

            this.docClient.query(params, (err, data) => {
                if (err) {
                    return reject(err);
                }

                resolve(data.Items);
            });
        });
    }

    async findOne(query: any = {}) {
        const result = await this.find(query);

        return result.length ? result[0] : null;
    }

    create(payload: Schema, useNativeId = true): any {
        const newPayload: any = Object.assign({}, payload);
        if (useNativeId) {
            newPayload.id = Helper.guid();
        }

        return this.update(newPayload);
    }

    update(payload: Schema): any {
        return new Promise((resolve, reject): void => {
            const params = {
                TableName: this.tableName,
                Item: payload,
                ReturnValues: 'ALL_OLD',
            };
            this.docClient.put(params, (err, data) => {
                if (err) {
                    return reject(err);
                }

                resolve(payload);
            });
        });
    }

    removeById(id: string): any {
        return new Promise((resolve, reject): void => {
            const params = {
                TableName: this.tableName,
                Key: { id },
            };
            this.docClient.delete(params, err => {
                if (err) {
                    return reject(err);
                }

                resolve(id);
            });
        });
    }
}

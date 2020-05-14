import BaseModel from './base-model';

export interface Cache {
    id: string;
    value: string;
    ttl: number;
}

export class CacheModel extends BaseModel<Cache> {
    private keyPrefix: string;

    constructor() {
        const tableName = process.env.CACHE_TABLE || 'caches';
        super(tableName);

        this.tableName = tableName;
        this.keyPrefix = 'cache-';
    }

    private generateKey(name: string) {
        return this.keyPrefix + name;
    }

    public get(name: string) {
        const id = this.generateKey(name);
        const data = super.findById(id);

        return data ? data.value : null;
    }

    public put(name: string, ttlInSeconds: number, value: any) {
        if (!ttlInSeconds) {
            // set default to 5 days
            ttlInSeconds = 5 * 24 * 60 * 60;
        }

        const payload = {
            id: this.generateKey(name),
            value,
            ttl: Math.floor(Date.now() / 1000) + ttlInSeconds,
        };

        return super.update(payload);
    }

    public remove(name: string) {
        const id = this.generateKey(name);
        return super.removeById(id);
    }
}

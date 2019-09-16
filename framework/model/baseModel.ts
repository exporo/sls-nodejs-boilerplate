import {database} from '../database/database';

export abstract class BaseModel {

    public static tableName: string = "foo";
    public static primaryId: string = "id";

    public static q() {
        return database(this.tableName);
    }

    public static find(id) {
        return this.q()
            .where(this.primaryId, '=', id)
            .first()
            .catch((error) => {
                console.log(error);
            });
    };

    public static updateOrCreate(lookup, insert) {
        return this.q().where(lookup).update(insert)
            .then((res) => {
                if (!res) {
                    return this.q().insert(Object.assign(lookup, insert));
                }
            });
    };

    public static delete(id) {
        return this.q()
            .where(this.primaryId, '=', id)
            .del();
    };
}
import {db} from '../resources/db';

export abstract class BaseModel {

    public static tableName: string = "foo";
    public static primaryId: string = "id";

    public static q() {
        return db(this.tableName);
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
        //TODO
    };

    public static delete(id) {
        return this.q()
            .where(this.primaryId, '=', id)
            .delete();
    };
}
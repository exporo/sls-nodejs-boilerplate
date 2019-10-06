import { BaseModel } from "../../../../framework/model/baseModel";

export interface UserItemInterface {
    id: number;
    user_id: number;
    name: string;
}

export class UserItem extends BaseModel {
    public static tableName: string = "users_item";
}

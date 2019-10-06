import {BaseRepository} from "../../../../framework/repository/baseRepository";
import {UserItem} from "../models/userItemModel";

export class UserItemRepository extends BaseRepository {
    model = UserItem;
}
import { BaseRepository } from "../../../../framework/repository/baseRepository";
import { User } from "../models/userModel";

export class UserRepository extends BaseRepository {
    model = User;
}
import { BaseModel } from "../../framework/model/baseModel";

export interface FailedJobInterface {
    id: number;
    name: string;
    payload: string;
    error: string;
}

export class FailedJob extends BaseModel {
    public static tableName: string = "failed_jobs";
}

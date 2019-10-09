import { BaseModel } from "../model/baseModel";

export abstract class BaseRepository {
    model: any;

    public get = async (id: number) => {
        return this.model
            .find(id)
            .catch(error => {
                throw {
                    status: 400,
                    error: error
                };
            });
    };

    public getAll = async () => {
        return this.model
            .q()
            .catch(error => {
                throw {
                    status: 400,
                    error: error
                };
            });
    };

    public add = async (data: object) => {
        return this.model
            .create(data)
            .then(() => {
                return data;
            })
            .catch(error => {
                throw {
                    status: 400,
                    error: error
                };
            });
    };

    public edit = async (id: number, data: object) => {
        return this.model
            .update(id, data)
            .catch(error => {
                throw {
                    status: 400,
                    error: error
                };
            });
    };

    public delete = async (id: number) => {
        return this.model
            .delete(id)
            .catch(error => {
                throw {
                    status: 400,
                    error: error
                };
            });
    };
}
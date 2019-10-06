import {ControllerException} from "../http/controllers/baseController";

export abstract class BaseRepository {
    model: any;

    public get = async (id: number, parentId?: number) => {
        return this.model
            .q()
            .where({[this.model.primaryIdColumn]: id})
            .modify((query) => {
                if (parentId) {
                    query.where({[this.model.parentIdColumn]: parentId})
                }
            })
            .first()
            .catch(error => {
                throw <ControllerException>{
                    status: 400,
                    error: error
                };
            });
    };

    public getAll = async (searchQuery?: string, parentId?: number) => {
        return this.model
            .q()
            .modify((query) => {
                if (parentId) {
                    query.where({[this.model.parentIdColumn]: parentId})
                }
            })
            .catch(error => {
                throw <ControllerException>{
                    status: 400,
                    error: error
                };
            });
    };

    public add = async (data: object, parentId?: number) => {
        if (parentId) {
            data = {...data, ...{[this.model.parentIdColumn]: parentId}};
        }

        return this.model
            .create(data)
            .then(() => {
                return data;
            })
            .catch(error => {
                throw <ControllerException>{
                    status: 400,
                    error: error
                };
            });
    };

    public edit = async (id: number, data: object, parentId?: number) => {
        return this.model
            .update(id, data)
            .catch(error => {
                throw <ControllerException>{
                    status: 400,
                    error: error
                };
            });
    };

    public delete = async (id: number, parentId?: number) => {
        return this.model
            .q()
            .where({[this.model.primaryIdColumn]: id})
            .modify((query) => {
                if (parentId && false) {
                    query.where({[this.model.parentIdColumn]: parentId})
                }
            })
            .delete()
            .catch(error => {
                throw <ControllerException>{
                    status: 400,
                    error: error
                };
            });
    };
}
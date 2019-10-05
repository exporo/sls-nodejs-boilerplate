import {idSchema} from "../../schemas/crudSchema";

const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

export class CrudController {
    route: string;
    essence: any;
    onStoreValidationSchema: object;
    onUpdateValidationSchema: object;

    constructor(route: string, essence: any) {
        this.essence = essence;
        this.route = route;
    }

    public setupRestHandler() {
        this.setupAPIHandler();

        return serverless(app);
    }

    public setupAPIHandler() {
        const {route} = this;

        app.get(`/${route}`, this.index);
        app.get(`/${route}/:id`, this.show);
        app.post(`/${route}`, this.store);
        app.put(`/${route}/:id`, this.update);
        app.delete(`/${route}/:id`, this.remove);

        return app;
    }

    private index = async (req, res) => {
        try {
            const response = await this.getAll();
            res.json(response);
        } catch (error) {
            res.status(error.status).json(error.error);
        }
    };

    private show = async (req, res) => {
        try {
            const id = req.params.id;
            this.validate({id: id}, idSchema);
            const response = await this.get(id);
            res.json(response);
        } catch (error) {
            res.status(error.status).json(error.error);

        }
    };

    public store = async (req, res) => {
        try {
            this.validate(req.body, this.onStoreValidationSchema);
            const response = await this.add(req.body);
            res.status(201).json(response);
        } catch (error) {
            res.status(error.status).json(error.error);
        }
    };

    private update = async (req, res) => {
        try {
            const id = req.params.id;
            this.validate(req.body, this.onUpdateValidationSchema);
            const response = await this.edit(id, req.body);
            res.status(202).json(response);
        } catch (error) {
            res.status(error.status).json(error.error);
        }
    };

    private remove = async (req, res) => {
        try {
            const id = req.params.id;
            this.validate({id: id}, idSchema);
            const response = await this.delete(id);
            res.status(204).json(response);
        } catch (error) {
            res.status(error.status).json(error.error);
        }
    };

    private validate = (data, schema) => {
        if (!schema) {
            return data;
        }

        const {error} = schema.validate(data);

        if (error) {
            throw {
                status: 422,
                error: error.details
            };
        } else {
            return data;
        }
    };

    private get = async (id: number) => {
        return this.essence
            .find(id)
            .catch(error => {
                throw {
                status: 400,
                error: error
            };
            });
    };

    private getAll = async () => {
        return this.essence
            .q()
            .catch(error => {
                throw {
                status: 400,
                error: error
            };
            });
    };

    private add = async (data: object) => {
        return this.essence
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

    private edit = async (id: number, data: object) => {
        return this.essence
            .update(id, data)
            .catch(error => {
                throw {
                status: 400,
                error: error
            };
            });
    };

    private delete = async (id: number) => {
        return this.essence
            .delete(id)
            .catch(error => {
                throw {
                status: 400,
                error: error
            };
            });
    };
}

export default app;

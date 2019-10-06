import {idSchema} from "../../schemas/crudSchema";
import {BaseRepository} from "../../repository/baseRepository";

const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

export class CrudController {
    route: string;
    essence: BaseRepository;
    onStoreValidationSchema: object;
    onUpdateValidationSchema: object;

    constructor(route: string, essence: BaseRepository) {
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
            const response = await this.essence.getAll();
            res.json(response);
        } catch (error) {
            res.status(error.status).json(error.error);
        }
    };

    private show = async (req, res) => {
        try {
            const id = req.params.id;
            this.validate({id: id}, idSchema);
            const response = await this.essence.get(id);
            res.json(response);
        } catch (error) {
            res.status(error.status).json(error.error);

        }
    };

    public store = async (req, res) => {
        try {
            this.validate(req.body, this.onStoreValidationSchema);
            const response = await this.essence.add(req.body);
            res.status(201).json(response);
        } catch (error) {
            res.status(error.status).json(error.error);
        }
    };

    private update = async (req, res) => {
        try {
            const id = req.params.id;
            this.validate(req.body, this.onUpdateValidationSchema);
            const response = await this.essence.edit(id, req.body);
            res.status(202).json(response);
        } catch (error) {
            res.status(error.status).json(error.error);
        }
    };

    private remove = async (req, res) => {
        try {
            const id = req.params.id;
            this.validate({id: id}, idSchema);
            const response = await this.essence.delete(id);
            res.status(204).json(response);
        } catch (error) {
            res.status(error.status).json(error.error);
        }
    };

    //////////

    private validate = (data, schema) => {
        if (!schema) {
            return data;
        }

        const {error} = schema.validate(data, { abortEarly: false });

        if (error) {
            throw {
                status: 422,
                error: error.details
            };
        } else {
            return data;
        }
    };
}

export default app;

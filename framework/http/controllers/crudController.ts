import {idSchema} from "../../schemas/crudSchema";
import {baseController} from "./baseController";
import {BaseRepository} from "../../repository/baseRepository";

const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

export class CrudController extends baseController {
    route: string;
    essence: BaseRepository;

    onStoreValidationSchema: object;
    onUpdateValidationSchema: object;

    constructor(route: string, essence: BaseRepository) {
        super();

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
            this.prerequisites(req);
            const parentId = req.params.parentId || null;
            const searchQuery = req.query.searchQuery || null;
            const searchColumn = req.query.searchColumn || null;
            const response = await this.essence.getAll(searchQuery, searchColumn, parentId);
            res.json(response);
        } catch (error) {
            res.status(error.status).json(error.error);
        }
    };

    private show = async (req, res) => {
        try {
            this.prerequisites(req);
            const id = req.params.id;
            const parentId = req.params.parentId || null;
            this.validate({id: id}, idSchema);
            const response = await this.essence.get(id, parentId);
            res.json(response);
        } catch (error) {
            res.status(error.status).json(error.error);

        }
    };

    public store = async (req, res) => {
        try {
            this.prerequisites(req);
            this.validate(req.body, this.onStoreValidationSchema);
            const parentId = req.params.parentId || null;
            const response = await this.essence.add(req.body, parentId);
            res.status(201).json(response);
        } catch (error) {
            res.status(error.status).json(error.error);
        }
    };

    private update = async (req, res) => {
        try {
            this.prerequisites(req);
            const id = req.params.id;
            this.validate(req.body, this.onUpdateValidationSchema);
            const parentId = req.params.parentId || null;
            const response = await this.essence.edit(id, req.body, parentId);
            res.status(202).json(response);
        } catch (error) {
            res.status(error.status).json(error.error);
        }
    };

    private remove = async (req, res) => {
        try {
            this.prerequisites(req);
            const id = req.params.id;
            this.validate({id: id}, idSchema);
            const parentId = req.params.parentId || null;
            const response = await this.essence.delete(id, parentId);
            res.status(204).json(response);
        } catch (error) {
            res.status(error.status).json(error.error);
        }
    };
}

export default app;

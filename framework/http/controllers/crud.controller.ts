import { idSchema } from "../../schemas/crud.schema";

const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

export class CrudController {
    route: string;
    essence: any;

    constructor(route: string, essence: any) {
        this.essence = essence;
        this.route = route;
    }

    public setupRestHandler() {
        this.setupAPIHandler();

        return serverless(app);
    }

    public setupAPIHandler() {
        const { route } = this;

        app.get(`/${route}/`, this.index);
        app.get(`/${route}/:id`, this.show);
        app.post(`/${route}/`, this.store);
        app.put(`/${route}/:id`, this.update);
        app.delete(`/${route}/:id`, this.remove);

        return app;
    }

    private index = async (req, res) => {
        try {
            const response = await this.getAll();

            res.status(response.statusCode).send(response.body);
        } catch (error) {
            res.status(400).send(error.message);
        }
    };

    private show = async (req, res) => {
        const id = req.params.id;
        const { error } = idSchema.validate({ id: id });

        if (error) {
            res.status(400).send(`${error.details[0].message}`);
        } else {
            const response = await this.get(id);

            res.send(response.body);
        }
    };

    public store = async (req, res) => {
        try {
            this.onStoreValidation(req.body);
            const response = await this.add(req.body);

            res.send(response.body);
        } catch (error) {
            const statusCode = error.message.split("::")[0];
            const message = error.message.split("::")[1];

            res.status(statusCode).send(message);
        }
    }

    onStoreValidation = (reqBody) => { }

    private update = async (req, res) => {
        try {
            const id = req.params.id;

            this.onUpdateValidation(req.params, req.body);
            const response = await this.edit(id, req.body);

            res.status(202).send(response.body);
        } catch (error) {
            const statusCode = error.message.split("::")[0];
            const message = error.message.split("::")[1];

            res.status(statusCode).send(message);
        }
    }

    onUpdateValidation = (reqParams, reqBody) => { }

    private remove = async (req, res) => {
        const id = req.params.id;
        const { error } = idSchema.validate({ id: id });

        if (error) {
            res.status(400).send(`${error.details[0].message}`);
        } else {
            const response = await this.delete(id);

            res.status(204).send(response.body);
        }
    };

    private get = async (id: number) => {
        return this.essence
            .find(id)
            .then(result => {
                return {
                    statusCode: 200,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(result)
                };
            })
            .catch(error => {
                console.log("!!! Error ", error);
            });
    };

    private getAll = async () => {
        return this.essence
            .q()
            .then(result => {
                return {
                    statusCode: 200,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(result)
                };
            })
            .catch(error => {
                console.log("!!! Error ", error);
            });
    };

    private add = async (data: object) => {
        return this.essence
            .create(data)
            .then(result => {
                return {
                    statusCode: 201,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                };
            })
            .catch(error => {
                console.log("!!! Error ", error);
            });
    };

    private edit = async (id: number, data: object) => {
        return this.essence
            .update(id, data)
            .then(result => {
                return {
                    statusCode: 202,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                };
            })
            .catch(error => {
                console.log("!!! Error ", error);
            });
    };

    private delete = async (id: number) => {
        return this.essence
            .delete(id)
            .then(result => {
                return {
                    statusCode: 204,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(result)
                };
            })
            .catch(error => {
                console.log("!!! Error ", error);
            });
    };
}

export default app;
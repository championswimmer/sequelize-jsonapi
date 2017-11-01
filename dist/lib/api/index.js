"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
function createResourceRoute(model) {
    const api = express_1.Router();
    api.get('/', (req, res, next) => {
        model.find().then(items => res.status(200).send(items));
    });
    api.post('/', (req, res, next) => {
        model.create(req.body).then(result => res.status(201).send());
    });
    return api;
}
function createAPIRoute(models) {
    const api = express_1.Router();
    for (let modelName in models) {
        api.use(`/${modelName}`, createResourceRoute(models[modelName]));
    }
    return api;
}
exports.createAPIRoute = createAPIRoute;
//# sourceMappingURL=index.js.map
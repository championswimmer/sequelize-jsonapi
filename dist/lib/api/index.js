"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/**
 * Create api route for one model
 * @param {sequelize.Model<any, any>} model
 * @returns {e.Router}
 */
function createResourceRoute(model) {
    const api = express_1.Router();
    api.get('/', (req, res, next) => {
        model.findAll().then(items => res.status(200).send(items));
    });
    api.post('/', (req, res, next) => {
        model.create(req.body).then(result => res.status(201).send());
    });
    api.patch('/:id', (req, res, next) => {
        model.update(req.body, {
            where: { id: req.params.id },
            returning: true
        }).then(item => res.status(201).send(item));
    });
    api.delete('/:id', (req, res, next) => {
        model.destroy({
            where: { id: req.params.id },
        }).then(result => res.status(202).send());
    });
    return api;
}
/**
 * Create all api routes for all models
 * @param {{[p: string]: sequelize.Model<any, any>}} models
 * @returns {e.Router}
 */
function createAPIRoute(models) {
    const api = express_1.Router();
    for (let modelName in models) {
        api.use(`/${modelName}`, createResourceRoute(models[modelName]));
    }
    return api;
}
exports.createAPIRoute = createAPIRoute;
//# sourceMappingURL=index.js.map
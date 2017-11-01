"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serializer_1 = require("../serializer");
/**
 * Create api route for one model
 * @param {sequelize.Model<any, any>} model
 * @returns {e.Router}
 */
function createResourceRoute(modelName, model) {
    const api = express_1.Router();
    api.get('/', (req, res, next) => {
        model.findAll({
            include: Object.keys(model.associations)
                .map(rel => {
                if (model.associations[rel].associationType = "BelongsTo") {
                    return {
                        model: model.sequelize.models[model.associations[rel].target.name],
                        attributes: ['id'],
                        as: rel
                    };
                }
            })
        }).then(items => res.status(200)
            .send(serializer_1.serializers[modelName].serialize(items)));
    });
    api.post('/', (req, res, next) => {
        model.create(serializer_1.deserializers[modelName].deserialize(req.body))
            .then(result => res.status(201).send());
    });
    api.patch('/:id', (req, res, next) => {
        model.update(serializer_1.deserializers[modelName].deserialize(req.body), {
            where: { id: req.params.id },
            returning: true
        }).then(item => res.status(201).send(item));
    });
    api.delete('/:id', (req, res, next) => {
        model.destroy({
            where: { id: req.params.id },
        }).then(result => res.status(200).send());
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
        api.use(`/${modelName}`, createResourceRoute(modelName, models[modelName]));
    }
    return api;
}
exports.createAPIRoute = createAPIRoute;
//# sourceMappingURL=index.js.map
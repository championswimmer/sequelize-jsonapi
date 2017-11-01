"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonapi_serializer_1 = require("jsonapi-serializer");
const serializers = {};
exports.serializers = serializers;
const deserializers = {};
exports.deserializers = deserializers;
function createSerializer(model) {
    let options = {
        attributes: [],
        keyForAttribute: 'camelCase'
    };
    for (let attr in model.attributes) {
        if (!model.attributes[attr].references) {
            options.attributes.push(attr);
        }
        else {
            let relName = model.attributes[attr].fieldName.slice(0, -2);
            options.attributes.push(relName);
            options[relName] = {
                ref: 'id',
                included: false,
                relationshipLinks: {
                    self: (dataSet, item) => `/${item.type}/${item.id}`
                }
            };
        }
    }
    return new jsonapi_serializer_1.Serializer(model.name, options);
}
function createSerializers(models) {
    for (let modelName in models) {
        serializers[modelName] = createSerializer(models[modelName]);
    }
}
exports.createSerializers = createSerializers;
//# sourceMappingURL=index.js.map
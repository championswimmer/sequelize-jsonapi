/// <reference types="sequelize" />
import sequelize = require('sequelize');
declare const serializers: {};
declare const deserializers: {};
declare function createSerializers(models: {
    [x: string]: sequelize.Model<any, any>;
}): void;
export { createSerializers, serializers, deserializers };

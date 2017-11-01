/// <reference types="sequelize" />
import Sequelize = require('sequelize');
declare const _default: {
    getDB: (dbUrl: string, dbOpts: Sequelize.Options) => Sequelize.Sequelize;
    prepareDB: (options?: Sequelize.SyncOptions, samples?: {
        [x: string]: any;
    }) => void;
    defineModel: (modelName: string, attributes: Sequelize.DefineAttributes, options?: Sequelize.DefineOptions<any>) => Sequelize.Model<any, {}>;
};
export default _default;

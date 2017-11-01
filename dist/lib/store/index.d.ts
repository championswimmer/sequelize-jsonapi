/// <reference types="sequelize" />
import Sequelize = require('sequelize');
declare const _default: {
    getDB: (dbUrl: string, dbOpts: Sequelize.Options) => Sequelize.Sequelize;
    prepareDB: (options?: Sequelize.SyncOptions, samples?: {
        [x: string]: any;
    }) => void;
};
export default _default;

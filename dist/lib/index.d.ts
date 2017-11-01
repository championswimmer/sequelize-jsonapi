/// <reference types="sequelize" />
/// <reference types="express" />
import Sequelize = require('sequelize');
import { Router } from 'express';
export interface SJOpts {
    dbUrl: string;
    dbOpts?: Sequelize.Options;
}
export declare class SJ {
    define: (modelName: string, attributes: Sequelize.DefineAttributes, options?: Sequelize.DefineOptions<any>) => Sequelize.Model<any, any>;
    sync: (options?: Sequelize.SyncOptions) => void;
    restAPI: Router;
    samples: {
        [x: string]: any;
    };
    private db;
    private models;
    constructor(opt: SJOpts);
}
export declare const Types: Sequelize.SequelizeStatic;

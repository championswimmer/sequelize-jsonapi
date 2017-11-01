/// <reference types="sequelize" />
/// <reference types="express" />
import sequelize = require('sequelize');
import { Router } from 'express';
/**
 * Create all api routes for all models
 * @param {{[p: string]: sequelize.Model<any, any>}} models
 * @returns {e.Router}
 */
declare function createAPIRoute(models: {
    [x: string]: sequelize.Model<any, any>;
}): Router;
export { createAPIRoute };

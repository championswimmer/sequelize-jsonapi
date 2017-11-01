/// <reference types="sequelize" />
/// <reference types="express" />
import sequelize = require('sequelize');
import { Router } from 'express';
declare function createAPIRoute(models: {
    [x: string]: sequelize.Model<any, any>;
}): Router;
export { createAPIRoute };

/// <reference types="sequelize" />
import Sequelize = require('sequelize');
declare function getDB(dbUrl: string, dbOpts: Sequelize.Options): Sequelize.Sequelize;
export default getDB;

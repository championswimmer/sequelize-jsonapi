/// <reference types="sequelize" />
import Sequelize = require('sequelize');
/**
 * Create the database
 * @param {string} dbUrl
 * @param {sequelize.Options} dbOpts
 * @returns {sequelize.Sequelize}
 */
declare function getDB(dbUrl: string, dbOpts: Sequelize.Options): Sequelize.Sequelize;
export default getDB;

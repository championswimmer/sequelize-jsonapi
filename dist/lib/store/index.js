"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
let db;
/**
 * Create the database
 * @param {string} dbUrl
 * @param {sequelize.Options} dbOpts
 * @returns {sequelize.Sequelize}
 */
function getDB(dbUrl, dbOpts) {
    // TODO: Throw error if dbURL is not correct format
    if (!db) {
        db = new Sequelize(dbUrl, dbOpts);
    }
    return db;
}
exports.default = getDB;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const debug_1 = require("debug");
let db;
const log = debug_1.default('sj:store');
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
function defineModel(modelName, attributes, options) {
    /**
     * Adding a 'types' parameter required for JSON:API
     * Making it virtual since we do not need to store this in DB
     * @type {{type: sequelize.DataTypeVirtual; set: (()); get: (() => string)}}
     */
    attributes['type'] = {
        type: Sequelize.VIRTUAL,
        set: () => { },
        get: () => modelName
    };
    return db.define(modelName, attributes, options);
}
function prepareDB(options, samples) {
    if (!db)
        return;
    db.sync(options)
        .then(() => {
        if (samples) {
            for (let modelName in samples) {
                if (Array.isArray(samples[modelName]))
                    db.model(modelName).bulkCreate(samples[modelName])
                        .then((result) => log('Bulk created samples'))
                        .catch((err) => log('Error in bulk create'));
            }
        }
    });
}
exports.default = { getDB, prepareDB, defineModel };
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("debug");
const Sequelize = require("sequelize");
const store_1 = require("./store");
const index_1 = require("./api/index");
class SJ {
    constructor(opt) {
        this.models = {};
        opt.dbOpts = Object.assign({}, opt.dbOpts);
        opt.dbOpts.logging = opt.dbOpts.logging || debug_1.default('sj:sequelize');
        this.db = store_1.default.getDB(opt.dbUrl, opt.dbOpts);
        this.define = (modelName, attributes, options) => {
            this.models[modelName] = (this.db.define(modelName, attributes, options));
            return this.models[modelName];
        };
        this.sync = (options) => {
            this.restAPI = index_1.createAPIRoute(this.models);
            store_1.default.prepareDB(options, this.samples);
        };
    }
}
exports.SJ = SJ;
exports.Types = Sequelize;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("debug");
const lib_1 = require("../lib");
const express = require("express");
const log = debug_1.default('sj:example');
const server = new lib_1.SJ({
    dbUrl: 'sqlite://db.sqlite',
});
const User = server.define('users', {
    age: lib_1.Types.INTEGER,
    name: lib_1.Types.STRING
});
const Article = server.define('articles', {
    title: lib_1.Types.STRING,
    body: lib_1.Types.TEXT
});
Article.belongsTo(User);
server.sync({ force: true })
    .then(() => log('DB Synced'));
const app = express();
app.use('/api', server.restAPI);
app.listen(2222, () => log('server started'));
//# sourceMappingURL=index.js.map
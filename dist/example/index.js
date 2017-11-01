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
const Comment = server.define('comments', {
    message: lib_1.Types.STRING
});
Article.belongsTo(User, { as: 'author' });
Comment.belongsTo(User, { as: 'commenter' });
Comment.belongsTo(Article);
server.samples = {
    users: [
        { age: 12, name: 'Harry' },
        { age: 13, name: 'Ron' }
    ],
    articles: [
        { title: 'Awesome Article', body: 'Some Stuff', authorId: 1 },
        { title: 'Another Piece', body: 'With some shoddy journalism', authorId: 2 }
    ]
};
server.sync({ force: true });
const app = express();
app.use('/api', server.restAPI);
app.listen(2222, () => log('server started'));
//# sourceMappingURL=index.js.map
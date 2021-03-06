import debug from 'debug'
import {SJ, Types} from '../lib'
import express = require('express')

const log = debug('sj:example')

const server = new SJ({
  dbUrl: 'sqlite://db.sqlite',
})

const User = server.define('users', {
  age: Types.INTEGER,
  name: Types.STRING
})
const Article = server.define('articles', {
  title: Types.STRING,
  body: Types.TEXT
})
const Comment = server.define('comments', {
  message: Types.STRING
})
Article.belongsTo(User, {as: 'author'})
Comment.belongsTo(User, {as: 'commenter'})
Comment.belongsTo(Article)
Article.hasMany(Comment)

server.samples = {
  users: [
    {age: 12, name: 'Harry'},
    {age: 13, name: 'Ron'}
  ],
  articles: [
    {title: 'Awesome Article', body: 'Some Stuff', authorId: 1},
    {title: 'Another Piece', body: 'With some shoddy journalism', authorId: 2}
  ],
  comments: [
    {message: "Good article", articleId: 1, commenterId: 1}
  ]
}


server.sync({force: true})

const app = express()
app.use('/api', server.restAPI)
app.listen(2222, () => log('server started'))

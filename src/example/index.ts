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

Article.belongsTo(User)

server.sync({force: true})
  .then(() => log('DB Synced'))

const app = express()
app.use('/api', server.restAPI)
app.listen(2222, () => log('server started'))

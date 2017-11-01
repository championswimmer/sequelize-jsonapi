import sequelize = require('sequelize')
import {Router} from 'express'

function createResourceRoute(model: sequelize.Model<any, any>): Router {
  const api = Router()
  api.get('/', (req, res, next) => {
    model.find().then(items => res.status(200).send(items))
  })
  api.post('/', (req, res, next) => {
    model.create(req.body).then(result => res.status(201).send())
  })
  return api
}
function createAPIRoute (models: {[x: string]: sequelize.Model<any, any>}): Router {
  const api = Router()
  for (let modelName in models) {
    api.use(`/${modelName}`, createResourceRoute(models[modelName]))
  }
  return api
}


export {
  createAPIRoute
}

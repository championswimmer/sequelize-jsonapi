import sequelize = require('sequelize')
import {Router} from 'express'
import * as sz from '../serializer'
import * as bodyParser from 'body-parser'

/**
 * Create api route for one model
 * @param {sequelize.Model<any, any>} model
 * @returns {e.Router}
 */
function createResourceRoute(modelName: string, model: sequelize.Model<any, any> | any): Router {
  const api = Router()
  api.get('/', (req, res, next) => {
    model.findAll({
      include:
        Object.keys(model.associations)
          .map(rel => {
            if (model.associations[rel].associationType = "BelongsTo") {
              return {
                model: model.sequelize.models[model.associations[rel].target.name],
                attributes: ['id'],
                as: rel
              }
            }
          })
    }).then(items =>
      res.status(200)
        .send(sz.serializers[modelName].serialize(items)))
  })
  api.post('/', (req, res, next) => {
    model.create(sz.deserializers[modelName].deserialize(req.body))
      .then(result => res.status(201).send())
  })
  api.patch('/:id', (req, res, next) => {
    sz.deserializers[modelName].deserialize(req.body)
      .then(data => {
        model.update(data, {
          where: {id: req.params.id},
        }).then(item => res.status(202).send(
          sz.serializers[modelName].serialize(item.map(i => ({id: i})))
        ))
      })

  })
  api.delete('/:id', (req, res, next) => {
    model.destroy({
      where: {id: req.params.id},
    }).then(result => res.status(200).send())
  })
  return api
}

/**
 * Create all api routes for all models
 * @param {{[p: string]: sequelize.Model<any, any>}} models
 * @returns {e.Router}
 */
function createAPIRoute (models: {[x: string]: sequelize.Model<any, any>}): Router {
  const api = Router()
  api.use(bodyParser.json({
    type: 'application/vnd.api+json'
  }))
  /**
   * Content negotiation
   */
  api.use((req, res, next) => {
    if (req.header('Content-Type') !== 'application/vnd.api+json') {
      return res.status(415).send({errors: [{
        code: '415',
        title: 'Unsupported Data Type'
      }]})
    }
    res.setHeader('Content-Type', 'application/vnd.api+json')
    next();
  })

  for (let modelName in models) {
    api.use(`/${modelName}`, createResourceRoute(modelName, models[modelName]))
  }
  return api
}


export {
  createAPIRoute
}

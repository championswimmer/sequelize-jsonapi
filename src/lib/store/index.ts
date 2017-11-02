import Sequelize = require('sequelize')
import Bluebird = require('bluebird')
import {isArray} from 'util'
import debug from 'debug'
import * as sz from '../serializer'

let db: Sequelize.Sequelize
const log = debug('sj:store')

/**
 * Create the database
 * @param {string} dbUrl
 * @param {sequelize.Options} dbOpts
 * @returns {sequelize.Sequelize}
 */
function getDB (dbUrl: string, dbOpts: Sequelize.Options) {
  // TODO: Throw error if dbURL is not correct format
  if (!db) {
    db = new Sequelize(dbUrl, dbOpts)
  }
  return db
}

function defineModel (modelName: string,
                      attributes: Sequelize.DefineAttributes,
                      options?: Sequelize.DefineOptions<any>) {
  /**
   * Adding a 'types' parameter required for JSON:API
   * Making it virtual since we do not need to store this in DB
   * @type {{type: sequelize.DataTypeVirtual; set: (()); get: (() => string)}}
   */
  attributes['type'] = {
    type: Sequelize.VIRTUAL,
    set: function (val) {this.setDataValue('type', val)},
    get: function () { return modelName }
  }
  return db.define(modelName, attributes, options)
}

function prepareDB (options?: Sequelize.SyncOptions, samples?: {[x:string]:any}) {
  if (!db) return
  db.sync(options)
    .then(() => {
      if (samples) {
        for (let modelName in samples) {
          if (Array.isArray(samples[modelName]))
            db.model(modelName).bulkCreate(samples[modelName])
              .then((result) => log('Bulk created samples'))
              .catch((err) => log('Error in bulk create'))
        }
      }
    })
}



export default { getDB, prepareDB, defineModel }

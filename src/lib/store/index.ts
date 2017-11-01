import Sequelize = require('sequelize')
import Bluebird = require('bluebird')
import {isArray} from 'util'
import debug from 'debug'

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



export default { getDB, prepareDB }

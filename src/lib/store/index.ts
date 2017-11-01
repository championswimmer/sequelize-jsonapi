import Sequelize = require('sequelize')

let db: Sequelize.Sequelize

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

export default getDB

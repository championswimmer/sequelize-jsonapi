import * as Bluebird from 'bluebird'
import debug from 'debug'
import Sequelize = require('sequelize')
import getDB from './store'
import {createAPIRoute} from './api/index'
import {Router} from 'express'

export interface SJOpts {
  dbUrl: string,
  dbOpts?: Sequelize.Options
}
export class SJ {
  public define: (
    modelName: string,
    attributes: Sequelize.DefineAttributes,
    options?: Sequelize.DefineOptions<any>) => Sequelize.Model<any, any>
  public sync: (options?: Sequelize.SyncOptions) => Bluebird<any>
  public restAPI: Router
  private db: Sequelize.Sequelize
  private models: {[x: string]: Sequelize.Model<any, any>} = {}
  constructor (opt: SJOpts) {
    opt.dbOpts = Object.assign({}, opt.dbOpts)
    opt.dbOpts.logging = opt.dbOpts.logging || debug('sj:sequelize')
    this.db = getDB(opt.dbUrl, opt.dbOpts)
    this.define = (
      modelName: string,
      attributes: Sequelize.DefineAttributes,
      options?: Sequelize.DefineOptions<any>) => {
        this.models[modelName] = (this.db.define(modelName, attributes, options))
        return this.models[modelName]
      }
    this.sync = (options) => {
      this.restAPI =  createAPIRoute(this.models)
      return this.db.sync(options)
    }
  }
}

export const Types = Sequelize

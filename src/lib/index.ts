import * as Bluebird from 'bluebird'
import debug from 'debug'
import Sequelize = require('sequelize')
import store from './store'
import {createAPIRoute} from './api/index'
import {Router} from 'express'
import {createSerializers} from './serializer/index'

export interface SJOpts {
  dbUrl: string,
  dbOpts?: Sequelize.Options
}
export class SJ {
  public define: (
    modelName: string,
    attributes: Sequelize.DefineAttributes,
    options?: Sequelize.DefineOptions<any>) => Sequelize.Model<any, any>
  public sync: (options?: Sequelize.SyncOptions) => void
  public restAPI: Router
  public samples: {[x: string]: any}
  private db: Sequelize.Sequelize
  private models: {[x: string]: Sequelize.Model<any, any>} = {}
  constructor (opt: SJOpts) {
    opt.dbOpts = Object.assign({}, opt.dbOpts)
    opt.dbOpts.logging = opt.dbOpts.logging || debug('sj:sequelize')
    this.db = store.getDB(opt.dbUrl, opt.dbOpts)
    this.define = (
      modelName: string,
      attributes: Sequelize.DefineAttributes,
      options?: Sequelize.DefineOptions<any>) => {
        this.models[modelName] = (store.defineModel(modelName, attributes, options))
        return this.models[modelName]
      }
    this.sync = (options) => {
      this.restAPI =  createAPIRoute(this.models)
      store.prepareDB(options, this.samples)
      createSerializers(this.db.models)
    }
  }
}

export const Types = Sequelize

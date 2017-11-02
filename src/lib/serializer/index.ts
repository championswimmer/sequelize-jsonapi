import {Serializer, Deserializer} from 'jsonapi-serializer'
import sequelize = require('sequelize')

const serializers = {}
const deserializers = {}

function createSerializer (model: any) {
  let options = {
    attributes: [],
    keyForAttribute: 'camelCase',
    dataLinks: {
      self: (dataSet, item) => `/${item.type}/${item.id}`
    }
  }
  for (let attr in model.attributes) {
    if (!model.attributes[attr].references) {
      options.attributes.push(attr)
    } else {
      let relName = model.attributes[attr].fieldName.slice(0,-2)
      options.attributes.push(relName)
      options[relName] = {
        ref: 'id',
        included: false,
        relationshipLinks: {
          resource: (dataSet, item) => `/${item.type}/${item.id}`,
          related: (dataSet, item) => `/${dataSet.type}/${dataSet.id}/${relName}`,
          self: (dataSet, item) => `/${dataSet.type}/${dataSet.id}/relationships/${relName}`
        }
      }
    }
  }
  for (let assoc in model.associations) {
    if (model.associations[assoc].associationType === "HasMany") {
      options.attributes.push(assoc)
      options[assoc] = {
        ref: 'id',
        included: false,
        relationshipLinks: {
          related: (dataSet, item) => `/${dataSet.type}/${dataSet.id}/${assoc}`,
          self: (dataSet, item) => `/${dataSet.type}/${dataSet.id}/relationships/${assoc}`

        }
      }
    }
  }
  return new Serializer(model.name, options)
}

function createDeserializer (model: any) {
  let options = {
    keyForAttribute: 'camelCase'
  }
  return new Deserializer(model.name, options)
}
function createSerializers (models: {[x:string]:sequelize.Model<any, any>}) {
  for (let modelName in models) {
    serializers[modelName] = createSerializer(models[modelName])
    deserializers[modelName] = createDeserializer(models[modelName])
  }
}


export {
  createSerializers,
  serializers,
  deserializers
}
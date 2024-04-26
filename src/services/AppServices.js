class AppServices {
    constructor(model) {
      this.model = model
    }
  
    async create(data) {
      try{
        const doc = await this.model.create(data)
        return doc.toObject()
      }catch(e ){new Error(e)}
     
    }
  
    async findById(id) {
      const doc = await this.model.findById(id).lean()
      if (!doc) {
        throw new Error('Document not found')
      }
      return doc
    }
  
    async findOne(condition) {
      const doc = await this.model.findOne(condition).lean()
      return doc
    }
  
    async findAll(filter = {}) {
      const docs = await this.model.find(filter).lean()
      return docs
    }
  
    async updateById(_id, data) {
      const doc = await this.model
        .findByIdAndUpdate(_id, data, {
          new: true,
          runValidators: true,
        })
        .lean()
      if (!doc) {
        throw new Error('Document not found')
      }
      return doc
    }
  
    async deleteById(_id) {
      const doc = await this.model.findByIdAndDelete(_id).lean()
      if (!doc) {
        throw new Error('Document not found')
      }
      return doc
    }

    async insertMany(data) {
      const docs = await this.model.insertMany(data)
      return docs.map((doc) => doc.toObject())
    }
  
    async updateMany(filter, update) {
      const result = await this.model.updateMany(filter, update)
      return result
    }
  }
  
  module.exports = AppServices
  
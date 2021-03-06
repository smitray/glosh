import _ from 'lodash';

export default class Crud {
  constructor(model) {
    this.model = model;
  }

  get(options) {
    return new Promise((resolve, reject) => {
      this.model.find(options ? options.qr : {})
        .select(options ? options.select ? options.select : {} : {}) //eslint-disable-line
        .populate(options ? options.populate ? options.populate : '' : '') //eslint-disable-line
        .exec()
        .then((result) => {
          resolve(result);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  single(options) {
    return new Promise((resolve, reject) => {
      this.model.findOne(options ? options.qr : {})
        .select(options ? options.select ? options.select : {} : {}) //eslint-disable-line
        .populate(options ? options.populate ? options.populate : '' : '') //eslint-disable-line
        .exec()
        .then((result) => {
          resolve(result);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  singleUpdate(options) {
    return new Promise((resolve, reject) => {
      this.model.findOneAndUpdate(options ? options.qr : {}, options ? options.opt : {})
        .select(options ? options.select ? options.select : {} : {}) //eslint-disable-line
        .populate(options ? options.populate ? options.populate : '' : '') //eslint-disable-line
        .exec()
        .then((result) => {
          resolve(result);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async put(options) {
    const record = await this.single(options.params);
    Object.assign(record, _.pickBy(options.body, _.identity));
    return new Promise((resolve, reject) => {
      record.save().then((result) => {
        resolve(result);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  async delete(options) {
    const record = await this.single(options.params);
    return new Promise((resolve, reject) => {
      record.remove().then((result) => {
        resolve(result);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  async deleteMany(options) {
    return new Promise((resolve, reject) => {
      this.model.deleteMany(options).then((result) => {
        resolve(result);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  create(options) {
    return new Promise((resolve, reject) => {
      this.model.create(options).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

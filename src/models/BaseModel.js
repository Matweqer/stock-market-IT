import { Model } from 'sequelize';
import { NotFound } from 'http-errors';

const DateKeys = ['createdAt', 'updatedAt'];

export default class BaseModel extends Model {
  static modelName = 'baseModel';

  static tableName = 'baseModels';

  static associationScopes = {};

  static dateKeys = DateKeys;

  static protectedKeys = [];

  static mutableKeys = [];

  static Settings = {};

  static initialize(sequelize) {
    super.init(this.Schema, {
      modelName: this.modelName,
      tableName: this.tableName,
      ...this.Settings,
      sequelize,
    });
  }

  static async findOneOrFail(where, options = {}) {
    const doc = await this.findOne({ where, ...options });
    if (!doc) {
      throw new NotFound(`${this.modelName} not found`);
    }
    return doc;
  }
}

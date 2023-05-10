import { DataTypes } from 'sequelize';
import { v4 as uuid } from 'uuid';
import BaseModel from './BaseModel';

export default class Executor extends BaseModel {
  static modelName = 'executor';

  static tableName = 'executors';

  static protectedKeys = ['createdAt', 'updatedAt'];

  static Schema = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    experience: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    technologies: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cv: {
      type: DataTypes.STRING,
    },
  };

  static Settings = {
    hooks: {
      async beforeCreate(executor) {
        executor.id = uuid();
      },
    },
  };

  static associate(models) {
    Executor.belongsTo(models.user, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
    });
  }

  static setupScopes(models) {
    this.addScope('data', () => ({
      attributes: ['id', 'experience', 'technologies', 'cv'],
      include: {
        model: models.user,
        as: 'user',
        attributes: ['id', 'name', 'secondName',
          'phone', 'photo', 'email',
        ],
      },
    }));
  }
}

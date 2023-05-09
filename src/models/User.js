import { DataTypes } from 'sequelize';
import { v4 as uuid } from 'uuid';
import BaseModel from './BaseModel';
import { roles } from '../constants';

export default class User extends BaseModel {
  static modelName = 'user';

  static tableName = 'users';

  static protectedKeys = ['createdAt', 'updatedAt'];

  static Schema = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secondName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(roles)),
      allowNull: false,
      defaultValue: roles.user,
    },
    phone: {
      type: DataTypes.STRING,
    },
    photo: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      protected: true,
    },

  };

  static Settings = {
    // define validators, indexes, hooks and etc here
    hooks: {
      async beforeCreate(user) {
        user.id = uuid();
      },
    },
  };

  static associate(models) {
    User.hasOne(models.customer, {
      as: 'customer',
      foreignKey: {
        name: 'userId',
      },
    });
  }

  static setupScopes() {
    this.addScope('data', () => ({
      attributes: ['id', 'name', 'secondName',
        'phone', 'photo', 'email',
      ],
    }));
  }
}

import { DataTypes } from 'sequelize';
import { v4 as uuid } from 'uuid';
import BaseModel from './BaseModel';

export default class Customer extends BaseModel {
  static modelName = 'customer';

  static tableName = 'customers';

  static protectedKeys = ['createdAt', 'updatedAt'];

  static Schema = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    employment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  static Settings = {
    hooks: {
      async beforeCreate(customer) {
        customer.id = uuid();
      },
    },
  };

  static associate(models) {
    Customer.belongsTo(models.user, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
    });
    Customer.hasMany(models.task, {
      as: 'tasks',
      foreignKey: {
        name: 'customerId',
      },
    });
  }

  static setupScopes(models) {
    this.addScope('data', () => ({
      attributes: ['id', 'employment'],
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

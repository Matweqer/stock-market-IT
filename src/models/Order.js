import { DataTypes } from 'sequelize';
import { v4 as uuid } from 'uuid';
import BaseModel from './BaseModel';

export default class Order extends BaseModel {
  static modelName = 'order';

  static tableName = 'orders';

  static protectedKeys = ['createdAt', 'updatedAt'];

  static Schema = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
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
    Order.belongsTo(models.customer, {
      as: 'customer',
      foreignKey: {
        name: 'customerId',
      },
    });
    Order.belongsTo(models.executor, {
      as: 'executor',
      foreignKey: {
        name: 'executorId',
      },
    });
  }
}

import { DataTypes } from 'sequelize';
import { v4 as uuid } from 'uuid';
import BaseModel from './BaseModel';

export default class Task extends BaseModel {
  static modelName = 'task';

  static tableName = 'tasks';

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
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.INTEGER,
    },
    img: {
      type: DataTypes.STRING,
    },
  };

  static Settings = {
    hooks: {
      async beforeCreate(task) {
        task.id = uuid();
      },
    },
  };

  static associate(models) {
    Task.belongsTo(models.customer, {
      as: 'customer',
      foreignKey: {
        name: 'customerId',
      },
    });
    Task.hasMany(models.request, {
      as: 'requests',
      foreignKey: {
        name: 'taskId',
      },
    });
  }

  static setupScopes(models) {
    this.addScope('data', () => ({
      attributes: ['id', 'status', 'description', 'cost', 'img', 'type', 'name'],
      include: {
        model: models.customer,
        as: 'customer',
        attributes: ['id', 'employment'],
        include: {
          model: models.user,
          as: 'user',
          attributes: ['id', 'name', 'secondName',
            'phone', 'photo', 'email',
          ],
        },
      },
    }));
  }
}

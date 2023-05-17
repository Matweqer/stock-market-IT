import { DataTypes } from 'sequelize';
import { v4 as uuid } from 'uuid';
import BaseModel from './BaseModel';

export default class Request extends BaseModel {
  static modelName = 'request';

  static tableName = 'requests';

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
  };

  static Settings = {
    hooks: {
      async beforeCreate(request) {
        request.id = uuid();
      },
    },
  };

  static associate(models) {
    Request.belongsTo(models.task, {
      as: 'task',
      foreignKey: {
        name: 'taskId',
      },
    });
    Request.belongsTo(models.executor, {
      as: 'executor',
      foreignKey: {
        name: 'executorId',
      },
    });
  }

  static setupScopes(models) {
    this.addScope('data', () => ({
      attributes: ['id', 'status'],
      include: [
        {
          model: models.executor,
          as: 'executor',
          attributes: ['id', 'experience', 'technologies', 'cv'],
          include: {
            model: models.user,
            as: 'user',
            attributes: ['id', 'name', 'secondName',
              'phone', 'photo', 'email',
            ],
          },
        },
        {
          model: models.task,
          as: 'task',
          attributes: ['id', 'status', 'description', 'cost', 'img', 'type', 'name'],
          include: {
            model: models.customer,
            as: 'customer',
            attributes: ['id', 'employment'],
          },
        },
      ],
    }));
  }
}

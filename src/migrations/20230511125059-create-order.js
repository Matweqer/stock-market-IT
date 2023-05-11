import { DataTypes } from 'sequelize';

export async function up(queryInterface) {
  const transaction = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.createTable('orders', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      customerId: {
        type: DataTypes.UUID,
        references: {
          model: {
            tableName: 'customers',
          },
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      executorId: {
        type: DataTypes.UUID,
        references: {
          model: {
            tableName: 'executors',
          },
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cost: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    }, { transaction });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}

export async function down(queryInterface) {
  const transaction = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.dropTable('orders', { transaction });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}

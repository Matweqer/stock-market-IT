import { DataTypes } from 'sequelize';

export async function up(queryInterface) {
  const transaction = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.createTable('customers', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      employment: {
        type: DataTypes.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('customers', { transaction });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}

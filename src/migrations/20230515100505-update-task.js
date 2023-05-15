import { DataTypes } from 'sequelize';

export async function up(queryInterface) {
  const transaction = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.addColumn(
      'tasks',
      'name',
      {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Unnamed task',
      },
      { transaction },
    );
    await queryInterface.addColumn(
      'tasks',
      'img',
      {
        type: DataTypes.STRING,
      },
      { transaction },
    );
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}

export async function down(queryInterface) {
  const transaction = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.removeColumn('tasks', 'name', { transaction });
    await queryInterface.removeColumn('tasks', 'img', { transaction });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}

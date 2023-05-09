import { Sequelize } from 'sequelize';
import { dbConfig } from '../config/sequelize';
import User from './User';
import Customer from './Customer';

const {
  database, username, password, ...configs
} = dbConfig;
const sequelize = new Sequelize(database, username, password, configs);

User.initialize(sequelize);
Customer.initialize(sequelize);

User.associate(sequelize.models);
Customer.associate(sequelize.models);

User.setupScopes();
Customer.setupScopes();

export {
  sequelize,
  Sequelize,
  User,
  Customer,
};

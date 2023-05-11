import { Sequelize } from 'sequelize';
import { dbConfig } from '../config/sequelize';

import User from './User';
import Customer from './Customer';
import Executor from './Executor';
import Order from './Order';

const {
  database, username, password, ...configs
} = dbConfig;
const sequelize = new Sequelize(database, username, password, configs);

User.initialize(sequelize);
Customer.initialize(sequelize);
Executor.initialize(sequelize);
Order.initialize(sequelize);

User.associate(sequelize.models);
Customer.associate(sequelize.models);
Executor.associate(sequelize.models);
Order.associate(sequelize.models);

User.setupScopes();
Customer.setupScopes(sequelize.models);
Executor.setupScopes(sequelize.models);

export {
  sequelize,
  Sequelize,
  User,
  Customer,
  Executor,
  Order,
};

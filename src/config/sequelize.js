export const dbConfig = {
  username: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || '1234567890',
  database: process.env.PGDATABASE || 'postgres',
  host: process.env.PGHOST || 'localhost',
  port: parseInt(process.env.PGPORT || 5051, 10),
  dialect: 'postgres',
  logging: false,
};

// sequelize cli required environments
export const production = dbConfig;
export const development = dbConfig;

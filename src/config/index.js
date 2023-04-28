import 'dotenv/config';

export const config = {
  PORT: parseInt(process.env.API_PORT, 10) || 5000,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret',
};

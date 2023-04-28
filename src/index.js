import app from './app';
import { config } from './config';
import { sequelize } from './models';

async function start() {
  await sequelize.authenticate();
  console.log('Database module initialized');
}

async function listeningServer() {
  app.listen(config.PORT, () => {
    console.log(`Server listened on port: ${config.PORT}`);
  });
}
start()
  .then(listeningServer)
  .catch((error) => {
    console.error(error);
  });

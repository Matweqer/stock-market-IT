import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// import { authRouter, usersRouter, systemRouter } from './routes';
import { errorHandler } from './middlewares';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use(cors());
app.use(morgan('tiny'));

// app.use('/img', express.static('./src/img'));
//
// app.use('/api/auth', authRouter);
// app.use('/api/users', usersRouter);
// app.use('/api/system', systemRouter);

app.get('/check', (req, res) => {
  console.log('TAKE A GET REQ');
  res.json({ ok: true });
});

app.use(errorHandler);

export default app;

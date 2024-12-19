import express from 'express';
import cors from 'cors';
import mysqlDb from './mysqlDb';
import categoriesRouter from './routers/categoriesRouter';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/category', categoriesRouter);


const run = async () => {
  await mysqlDb.init();
  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

void run();
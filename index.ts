import express from 'express';
import cors from 'cors';
import mysqlDb from './mysqlDb';
import categoriesRouter from './routers/categoriesRouter';
import placesRouter from './routers/placesRouter';
import itemsRouter from './routers/itemsRouter';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/category', categoriesRouter);
app.use('/places' , placesRouter);
app.use('/items', itemsRouter);


const run = async () => {
  await mysqlDb.init();
  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

void run();
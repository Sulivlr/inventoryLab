import express from 'express';
import {Item, ItemsMutation} from '../types';
import {imagesUpload} from '../multer';
import mysqlDb from '../mysqlDb';
import {ResultSetHeader} from 'mysql2';

const itemsRouter = express.Router();

itemsRouter.get('/', async(req, res, next) => {
  try {
    const connection = mysqlDb.getConnection();
    const result = await connection.query('SELECT * FROM items');
    const items = result[0] as Item[];
    res.send(items);
  } catch (error) {
    next(error);
  }
});

itemsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.categoryId || !req.body.placeId || !req.body.title) {
      res.status(400).send({error: 'category and place and title are required'});
    }

    const itemMutation: ItemsMutation = {
      categoryId: parseInt(req.body.categoryId),
      placeId: parseInt(req.body.placeId),
      title: req.body.title,
      description: req.body.description,
      image: req.file ? req.file.filename : null,
    };

    const connection = mysqlDb.getConnection();
    const insertResult = await connection.query('INSERT INTO items (category_id, places_id, title, description, image) VALUES (?, ?, ?, ?, ?)',
      [itemMutation.categoryId, itemMutation.placeId, itemMutation.title, itemMutation.description, itemMutation.image],
    );

    const resultHeader = insertResult[0] as ResultSetHeader;

    const getNewResult = await mysqlDb.getConnection().query(
      'SELECT * FROM items WHERE id = ?',
      [resultHeader.insertId]
    );

    const items = getNewResult[0] as Item[];

    res.send(items[0]);

  } catch (error) {
    next(error);
  }
});

export default itemsRouter;
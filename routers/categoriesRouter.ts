import express from 'express';
import {Category, CategoryMutation} from '../types';
import mysqlDb from '../mysqlDb';
import {ResultSetHeader} from 'mysql2';

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (_req, res, next) => {
  try {

    const connection = mysqlDb.getConnection();
    const result = await connection.query('SELECT * FROM category');
    const categories = result[0] as Category[];
    res.send(categories);
  } catch (error) {
    next(error);
  }
});

categoriesRouter.get('/:id', async (req, res, next) => {
  try {
    const connection = mysqlDb.getConnection();
    const id = req.params.id;
    const result = await connection.query('SELECT * FROM category WHERE id = ?', [id]);
    const category = result[0] as Category[];
    if (category.length === 0) {
      res.status(404).send({error: `No category`});
    }
    res.send(category[0]);
  } catch (error) {
    next(error);
  }
});

categoriesRouter.delete('/:id', async (req, res, next) => {
  try {
    const connection = mysqlDb.getConnection();
    const id = req.params.id;
    const result = await connection.query('SELECT * FROM category WHERE id = ?', [id]);
    const category = result[0] as Category[];
    if (category.length === 0) {
      res.status(404).send({error: `No category`});
    }
    const deletedResult = await connection.query('DELETE FROM category WHERE id = ?', [id]);
    res.send(deletedResult[0]);

  } catch (error) {
    next(error);
  }
});

categoriesRouter.post('/', async (req, res, next) => {
  try {
    if (!req.body.title) {
      res.status(400).send({error: 'Title is required'});
    }

    const categoryMutation: CategoryMutation = {
      title: req.body.title,
      description: req.body.description,
    };

    const connection = mysqlDb.getConnection();
    const insertResult = await connection.query(
      'INSERT INTO category (title, description) VALUES (?, ?)',
      [categoryMutation.title, categoryMutation.description],
    )

    const resultHeader = insertResult[0] as ResultSetHeader;

    const getNewResult = await mysqlDb.getConnection().query(
      'SELECT * FROM category WHERE id = ?',
      [resultHeader.insertId],
    );

    const categories = getNewResult[0] as Category[];

    res.send(categories[0]);

  } catch (error) {
    return next(error);
  }
});

export default categoriesRouter;
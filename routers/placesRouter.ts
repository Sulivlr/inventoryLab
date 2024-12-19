import express from 'express';
import {Place, PlacesMutation} from '../types';
import mysqlDb from '../mysqlDb';
import {ResultSetHeader} from 'mysql2';


const placesRouter = express.Router();

placesRouter.get('/', async (_req, res, next) => {
  try {
    const connection = mysqlDb.getConnection();
    const result = await connection.query('SELECT * FROM places');
    const places = result[0] as Place[];
    res.send(places);
  } catch (error) {
    next(error);
  }
});

placesRouter.get('/:id', async (req, res, next) => {
  try {
    const connection = mysqlDb.getConnection();
    const id = req.params.id;
    const result = await connection.query('SELECT * FROM places WHERE id = ?', [id]);
    const place = result[0] as Place[];
    if (place.length === 0) {
      res.status(404).send({error: `No data of place`});
    }
    res.send(place[0]);
  } catch (error) {
    next(error);
  }
});

placesRouter.delete('/:id', async (req, res, next) => {
  try {
    const connection = mysqlDb.getConnection();
    const id = req.params.id;
    const result = await connection.query('SELECT * FROM places WHERE id = ?', [id]);
    const place = result[0] as Place[];
    if (place.length === 0) {
      res.status(404).send({error: `No data of place`});
    }
    const deletedResult = await connection.query('DELETE FROM places WHERE id = ?', [id]);
    res.send(deletedResult[0]);
  } catch (error) {
    next(error);
  }
});

placesRouter.post("/", async (req, res, next) => {
  try {
    if (!req.body.title) {
      res.status(404).send({error: `Title is required`});
    }

    const placesMutation: PlacesMutation = {
      title: req.body.title,
      description: req.body.description,
    };

    const connection = mysqlDb.getConnection();
    const insertResult = await connection.query(
      'INSERT INTO places (title, description) VALUES (?, ?)',
      [placesMutation.title, placesMutation.description],
    )

    const resultHeader = insertResult[0] as ResultSetHeader;
    const getNewResult = await mysqlDb.getConnection().query(
      'SELECT * FROM places WHERE id = ?',
      [resultHeader.insertId],
    )

    const places = getNewResult[0] as Place[];
    res.send(places[0]);
  } catch (error) {
    next(error);
  }
});

export default placesRouter;
const { Router } = require('express');
const Order = require('../models/Order');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const resp = await Order.insert({
      product: req.body.product,
      quantity: req.body.quantity,
    });

    res.json(resp);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const order = await Order.getById(req.params.id);
      res.send(order);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .get('/', async (req, res) => {
    const resp = await Order.getAll();
    res.send(resp);
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const resp = await Order.updateById(id, {
        product: req.body.product,
        quantity: req.body.quantity,
      });

      if (!resp.id) {
        const error = new Error('Order ${id} not found');
        error.status = 404;
        throw error;
      }

      res.json(resp);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const { rows } = await pool.query(
      'DELETE FROM orders WHERE id=$1 RETURNING *;',
      [req.params.id]
    );

    if (!rows[0]) return null;
    const order = new Order(rows[0]);

    res.json(order);
  });

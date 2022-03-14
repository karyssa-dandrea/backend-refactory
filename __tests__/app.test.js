const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order');

// TODO: Remove this function & use the Order model
async function createOrder({ product, quantity }) {
  const { rows } = await pool.query(
    'INSERT INTO orders(product, quantity) VALUES ($1, $2) RETURNING *;',
    [product, quantity]
  );
  return new Order(rows[0]);
}

// TODO: Remove this function & use the Order model
async function getOrderById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM orders WHERE id=$1;',
    [id]
  );

  if (!rows[0]) return null;

  return new Order(rows[0]);
}

describe('refactory routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should be able to create an order', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ product: 'Widget', quantity: 1 });

    expect(res.body).toEqual({
      id: expect.any(String),
      product: 'Widget',
      quantity: 1,
    });
  });

  it('should be able to list an order by id', async () => {
    const order = await createOrder({ product: 'Widget', quantity: 1 });
    const res = await request(app).get(`/api/v1/orders/${order.id}`);

    expect(res.body).toEqual(order);
  });

  it('should be able to list orders', async () => {
    await createOrder({ product: 'Widget', quantity: 1 });
    const res = await request(app).get('/api/v1/orders');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        product: 'Widget',
        quantity: 1,
      },
    ]);
  });

  it('should be able to update an order', async () => {
    const order = await createOrder({ product: 'Widget', quantity: 1 });
    const res = await request(app)
      .patch(`/api/v1/orders/${order.id}`)
      .send({ product: 'Thingamajig', quantity: 2 });

    const expected = {
      id: expect.any(String),
      product: 'Thingamajig',
      quantity: 2,
    };

    expect(res.body).toEqual(expected);
    expect(await getOrderById(order.id)).toEqual(expected);
  });

  it('should be able to delete an order', async () => {
    const order = await createOrder({ product: 'Widget', quantity: 1 });
    const res = await request(app).delete(`/api/v1/orders/${order.id}`);

    expect(res.body).toEqual(order);
    expect(await getOrderById(order.id)).toBeNull();
  });
});

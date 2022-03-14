-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  product TEXT NOT NULL,
  quantity INT NOT NULL
);

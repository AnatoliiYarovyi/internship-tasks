import express from 'express';
import cors from 'cors';

import suppliers from './routes/suppliers';
import products from './routes/products';
import orders from './routes/orders';
import employees from './routes/employees';
import customers from './routes/customers';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/suppliers', suppliers);
app.use('/products', products);
app.use('/orders', orders);
app.use('/employees', employees);
app.use('/customers', customers);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _, res, __) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export default app;

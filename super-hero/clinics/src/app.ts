import express from 'express';
import cors from 'cors';

import cities from './routes/cities';
import suburbs from './routes/suburbs';
import clinics from './routes/clinics';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/cities', cities);
app.use('/suburbs', suburbs);
app.use('/clinics', clinics);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _, res, __) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export default app;

import express from 'express';
const app = express();

import user from './routes/user';

app.use('/api/v1/users', user);
app.listen(3000, () => console.log('express with typescript'));

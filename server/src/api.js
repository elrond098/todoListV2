import express from 'express';
import useCtnr from './router.js';

const app = express();
const port = 3000;

app.use('/ctnr', useCtnr);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

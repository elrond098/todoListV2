import express from 'express';
import useCtnr from './router.js';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors()); 
app.use(express.json());

app.use('/ctnr', useCtnr);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

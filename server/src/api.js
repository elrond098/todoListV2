import express from 'express';
import useCtnr from './routerContainer.js';
import useTodoList from './routerTodoList.js';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.use('/ctnr', useCtnr);
app.use('/todolist', useTodoList);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

import express from 'express';
import { addTodoList, displayTodoList, deleteTodoList } from './serv.js';
const router = express.Router();

router.post('/display', async (req, res) => {
  console.log('router.js: BE Received The Request');
  const { id } = req.body;
  const dbres = await displayTodoList(id);
  console.log('router.js: Data From DB:', dbres);
  res.status(200).json({
    success: true,
    message: 'TodoList had been received by server',
    data: dbres
  });
});

router.post('/add', async (req, res) => {
  console.log('router.js: BE Received The TodoList', req.body);
  const { id, title } = req.body;
  const dbres = await addTodoList(id, title);
  res.status(200).json({
    success: true,
    message: 'TodoList had been received by server',
    data: dbres
  });
});

router.delete('/delete', async (req, res) => {
  console.log('router.js: BE Received The Request', req.body);
  const { idTodoList } = req.body;
  const dbres = await deleteTodoList(idTodoList);
  res.status(200).json({
    success: true,
    mesasge: 'TodoList had beed deleted by server',
    data: dbres
  });
});

export default router;

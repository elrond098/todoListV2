import express from 'express';
import { addTodoList, displayTodoList, deleteTodoList, changeCompletedStatus, updateTodoPosition } from './serv.js';
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
  const { idTodoList, id, completed } = req.body;
  const dbres = await deleteTodoList(idTodoList, id, completed);
  res.status(200).json({
    success: true,
    mesasge: 'TodoList had beed deleted by server',
    data: dbres
  });
});

router.patch('/changecompletedstatus', async (req, res) => {
  console.log('router.js: BE Received The Request', req.body);
  const { completed, idTodoList, id } = req.body;
  const dbres = await changeCompletedStatus(completed, idTodoList, id);
  res.status(200).json({
    success: true,
    message: 'TodoList status had been changed',
    data: dbres
  });
});

router.put('/changeposition', async (req, res) => {
  console.log('router.js: BE Received The Request', req.body);
  const { idTodoList, position } = req.body;
  const dbres = await updateTodoPosition(idTodoList, position);
  res.status(200).json({
    success: true,
    message: 'TodoList position has been changed',
    data: dbres
  });
});

export default router;

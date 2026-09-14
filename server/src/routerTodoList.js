import express from 'express';
import { addTodoList, getAllTodoList, deleteTodoList, changeCompletedStatus, updateTodoListPosition } from './serv.js';
const router = express.Router();

router.post('/display', async (req, res) => {
  console.log('router.js: BackEnd Received The Request');
  const { idContainer } = req.body;
  const databaseRes = await getAllTodoList(idContainer);
  console.log('router.js: Data From DB:', databaseRes);
  res.status(200).json({
    success: true,
    message: 'TodoList had been taken by BackEnd',
    data: databaseRes
  });
});

router.post('/add', async (req, res) => {
  console.log('router.js: BackEnd Received The TodoList', req.body);
  const { idContainer, task } = req.body;
  const databaseRes = await addTodoList(idContainer, task);
  res.status(200).json({
    success: true,
    message: 'TodoList had been added by BackEnd',
    data: databaseRes
  });
});

router.delete('/delete', async (req, res) => {
  console.log('router.js: BackEnd Received The Request', req.body);
  const { idTodoList, idContainer, completed } = req.body;
  const databaseRes = await deleteTodoList(idTodoList, idContainer, completed);
  res.status(200).json({
    success: true,
    mesasge: 'TodoList had beed deleted by BackEnd',
    data: databaseRes
  });
});

router.patch('/changecompletedstatus', async (req, res) => {
  console.log('router.js: BE Received The Request', req.body);
  const { completed, idTodoList, idContainer } = req.body;
  const databaseRes = await changeCompletedStatus(completed, idTodoList, idContainer);
  res.status(200).json({
    success: true,
    message: 'TodoList status had been changed by BackEnd',
    data: databaseRes
  });
});

router.put('/changeposition', async (req, res) => {
  console.log('router.js: BackEnd Received The Request', req.body);
  const { idTodoList, position } = req.body;
  const databaseRes = await updateTodoListPosition(idTodoList, position);
  res.status(200).json({
    success: true,
    message: 'TodoList position has been changed',
    data: databaseRes
  });
});

export default router;

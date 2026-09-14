import express from 'express';
import { addContainer, getAllContainers, deleteContainer } from './serv.js';
const router = express.Router();

router.get('/display', async (req, res) => {
  console.log('router.js: BackEnd Received The Request');
  const databaseRes = await getAllContainers();
  console.log('router.js: Data From Database:', databaseRes);
  res.status(200).json({
    success: true,
    message: 'routerContainer.js: Container had been taken by BackEnd',
    data: databaseRes
  });
});

router.post('/add', async (req, res) => {
  console.log('router.js: BackEnd Received The Container', req.body);
  const { title } = req.body;
  const databaseRes = await addContainer(title);
  res.status(200).json({
    success: true,
    message: 'Container had been added by BackEnd',
    data: databaseRes
  });
});

router.delete('/delete', async (req, res) => {
  console.log('router.js: BE Received The Request', req.body);
  const { id, completed } = req.body;
  const databaseRes = await deleteContainer(id, completed);
  res.status(200).json({
    success: true,
    mesasge: 'Container had beed deleted by BackEnd',
    data: databaseRes
  });
});

export default router;

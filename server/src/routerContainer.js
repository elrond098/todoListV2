import express from 'express';
import { addContainer, display, deleteContainer } from './serv.js';
const router = express.Router();

router.get('/display', async (req, res) => {
  console.log('router.js: BE Received The Request');
  const dbres = await display();
  console.log('router.js: Data From DB:', dbres);
  res.status(200).json({
    success: true,
    message: 'Container had been received by server',
    data: dbres
  });
});

router.post('/add', async (req, res) => {
  console.log('router.js: BE Received The Container', req.body);
  const { container } = req.body;
  const dbres = await addContainer(container);
  res.status(200).json({
    success: true,
    message: 'Container had been received by server',
    data: dbres
  });
});

router.delete('/delete', async (req, res) => {
  console.log('router.js: BE Received The Request', req.body);
  const { id, completed } = req.body;
  const dbres = await deleteContainer(id, completed);
  res.status(200).json({
    success: true,
    mesasge: 'Container had beed deleted by server',
    data: dbres
  });
});

export default router;

import express from 'express';
import { addContainer } from './serv.js';

const router = express.Router();

router.get('/display', async (req, res) => {
  res.send('Test get all data');
})

router.post('/add', async (req, res) => {
  console.log('router.js: BE Received The Container', req.body);
  const { container } = req.body;
  const dbres = await addContainer(container)
  res.status(200).json({
    success: true,
    message: 'Container had been received by server',
    data: dbres
  });
});

router.delete('/delete', async (req, res) => {
  res.send('Test delete data');
})

export default router;

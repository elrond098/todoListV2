import express from 'express';
import qr, { end } from './db.js'
const router = express.Router();

router.get('/display', (res, req) => {
  res.send('Test get all data');
})

router.post('/add', (res, req) => {
res.send('Test add data');
})

router.delete('/delete', (res, req) => {
  res.send('Test delete data');
})

export default router;

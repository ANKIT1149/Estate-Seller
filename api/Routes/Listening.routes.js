import express from 'express';
import { Deletelistening, createListening, getListening, updateListening } from '../controllers/Listening.controllers.js';
import { VerifyToken } from '../utils/Verifyuser.js';

const listeningRouter = express.Router()

listeningRouter.post('/create', VerifyToken,  createListening);

listeningRouter.delete('/delete/:id', VerifyToken, Deletelistening);

listeningRouter.post('/update/:id', VerifyToken, updateListening);

listeningRouter.get('/get/:id', getListening);

export default listeningRouter;
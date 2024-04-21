import express from 'express';
import { createListening } from '../controllers/Listening.controllers.js';
import { VerifyToken } from '../utils/Verifyuser.js';

const listeningRouter = express.Router()

listeningRouter.post('/create', VerifyToken,  createListening)

export default listeningRouter;
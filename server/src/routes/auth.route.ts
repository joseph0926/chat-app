import { createProfile } from '@/controllers/auth.controller';
import express from 'express';

const authRouter = express.Router();

authRouter.post('/create-profile', createProfile);

export default authRouter;

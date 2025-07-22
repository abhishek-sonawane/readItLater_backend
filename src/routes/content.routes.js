import express from 'express';
import { handleGetContent, handleSaveContent } from '../controllers/content.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// get all content & Create/add a single content 
router
  .route('/')
  .get(verifyJWT, handleGetContent)
  .post(verifyJWT, handleSaveContent);


export default router;
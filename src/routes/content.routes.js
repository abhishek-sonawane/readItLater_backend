import express from 'express';
import { handleGetContent, handleSaveContent } from '../controllers/content.controller.js';


const router = express.Router();


router.post('/saveContent', handleSaveContent);
router.get('/getContent', handleGetContent)


export default router;
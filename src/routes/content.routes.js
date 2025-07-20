import express from 'express';
import { handleGetContent, handleSaveContent } from '../controllers/content.controller.js';

const router = express.Router();

// get all content
router.route('/').get(handleGetContent)

// create content
router.route('/').post(handleSaveContent)


export default router;
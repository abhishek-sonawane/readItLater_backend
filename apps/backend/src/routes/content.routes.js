import express from 'express';
import { handleAddContentToFolder, handleGetContent, handleRemoveContent, handleSaveContent, moveContentToFolder, removeContentFromFolder } from '../controllers/content.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// get all content & Create/add a single content 
router
  .route('/')
  .get(verifyJWT, handleGetContent)
  .post(verifyJWT, handleSaveContent);

router
.route('/:id')
.post(verifyJWT,handleRemoveContent)

router
.route('/:contentID/:folderID')
.post(verifyJWT,handleAddContentToFolder)



router
.route('/remove/:contentID/:folderID')
.post(verifyJWT,removeContentFromFolder)

router
.route('/move/:contentID/:prevfolderID/:newfolderID')
.post(verifyJWT,moveContentToFolder)


export default router;
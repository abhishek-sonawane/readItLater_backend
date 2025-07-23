import express from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { handleCreateFolder, handleGetFolders } from '../controllers/folder.controller.js'

const router = express.Router()

router.route('/')
.get(verifyJWT,handleGetFolders)
.post(verifyJWT,handleCreateFolder)


export default router
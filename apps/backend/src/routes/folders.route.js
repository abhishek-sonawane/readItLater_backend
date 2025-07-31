import express from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { handleCreateFolder, handleDeleteFolder, handleGetFolders, handleUpdateFolder } from '../controllers/folder.controller.js'

const router = express.Router()
/**
 * @swagger
 * tags:
 *   name: Folders
 *   description: API for managing user folders
 */

/**
 * @swagger
 * /api/v1/folders/:
 *   get:
 *     summary: Get all folders of the authenticated user
 *     tags: [Folders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched folders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Folders fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       userId:
 *                         type: string
 *       204:
 *         description: No folders made by this user
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *
 *   post:
 *     summary: Create a new folder for the authenticated user
 *     tags: [Folders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - folderNameQuery
 *             properties:
 *               folderNameQuery:
 *                 type: string
 *                 example: My New Folder
 *     responses:
 *       200:
 *         description: Folder created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Folder created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     folderName:
 *                       type: string
 *                       example: My New Folder
 *       400:
 *         description: Empty body or folder name
 *       409:
 *         description: Folder with this name already exists
 *       401:
 *         description: Unauthorized
 */
router.route('/')
.get(verifyJWT,handleGetFolders)
.post(verifyJWT,handleCreateFolder)


/**
 * @swagger
 * /api/v1/folders/{id}:
 *   patch:
 *     summary: Update a folder's name
 *     tags: [Folders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Folder ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - folderName
 *             properties:
 *               folderName:
 *                 type: string
 *                 example: Updated Folder Name
 *     responses:
 *       200:
 *         description: Folder updated successfully or no content changes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Folder updated Successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     updateFolder:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         userId:
 *                           type: string
 *       400:
 *         description: Folder does not exist or bad request
 *       403:
 *         description: Unauthorized to update this folder
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
.patch(verifyJWT,handleUpdateFolder)

router.route('/:id')
.post(verifyJWT,handleDeleteFolder)


export default router
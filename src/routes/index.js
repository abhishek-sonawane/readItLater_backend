import express from 'express';
import contentRoutes from './content.routes.js';
import authRoutes from './auth.routes.js'
import userRoutes from './user.routes.js'
import foldersRoutes from './folders.route.js'
import tagsRoutes from './tags.route.js'


const router = express.Router();


router.use('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API is running' });
});
router.use('/auth',authRoutes)
router.use('/user',userRoutes)
router.use('/content',contentRoutes)
router.use('/folders',foldersRoutes)
router.use('/tags',tagsRoutes)


export default router;
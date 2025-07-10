import express from 'express';
import contentRoutes from './content.routes.js';


const router = express.Router();


router.use('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API is running' });
});
router.use('/content',contentRoutes)


export default router;
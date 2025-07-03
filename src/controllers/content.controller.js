import scraperQueue from '../queues/scraper.queue.js';
import ApiResponse from '../utils/apiResponse.js';
// import client from './lib/prisma.js';



export async function handleSaveContent(req, res) {
    const url = req.body.url;
    if (!url) {
        return res.status(400).json({
            error: 'URL is required'
        });
    }
    await scraperQueue.add({ url });

    return res.status(200).json(new ApiResponse(200, 'Content scraped successfully', { url }));
}

export async function handleGetContent(req, res) {
    if (db.length === 0) {
        return res.status(404).json({
            error: 'No content found'
        });
    }

    // res.json({
    //     message: 'Content retrieved successfully',
    //     data: db[0]
    // });

    res.send(db[0].content);
}

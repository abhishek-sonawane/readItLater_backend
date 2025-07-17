import scraperQueue from '../queues/scraper.queue.js';
import ApiResponse from '../utils/apiResponse.js';
// import client from './lib/prisma.js';

const db = [{ 'name': 'abhi' }]; // Simulating a database with an in-memory array

export async function handleSaveContent(req, res) {
    const url = req.body.url;
    if (!url) {
        return res.status(400).json(new ApiError(400,'URL is required'));
    }
    await scraperQueue.add({ url });

    return res.status(200).json(new ApiResponse(200, 'Content scraped successfully', { url }));
}

export async function handleGetContent(req, res) {
    if (db.length === 0) {
        return res.status(404).json(new ApiError(404,'No saved content yet!'));
    }
    return res.status(200).json(new ApiResponse(200, 'Content retrieved successfully', {content:db} ))
}

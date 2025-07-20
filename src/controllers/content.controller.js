import { client } from '../lib/prisma.js';
import scraperQueue from '../queues/scraper.queue.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';


const  handleSaveContent = asyncHandler(async(req, res)=> {
    const url = req.body.url;
    if (!url) {
        throw new ApiError(400,'No data recieved')
    }
    await scraperQueue.add({ url });

    return res.status(200).json(new ApiResponse(200,'Content scraped successfully', { url }));
})

const  handleGetContent= asyncHandler(async(req, res)=> {
    // TODO: get content based on userID and implement pagination aswell
    const contentList = await client.content.findMany()
    res.status(200).json(new ApiResponse(200,'Content fetched successfully',contentList))
})

export {
    handleSaveContent,
    handleGetContent
}
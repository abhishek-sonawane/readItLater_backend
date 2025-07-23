import { client } from '../lib/prisma.js';
import scraperQueue from '../queues/scraper.queue.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';


const  handleSaveContent = asyncHandler(async(req, res)=> {
    const url = req.body.url;
    const user = req.user;
    if (!url) {
        throw new ApiError(400,'No data recieved')
    }
    await scraperQueue.add({ url,user });

    return res.status(200).json(new ApiResponse(200,'Content scraped successfully', { url }));
})

const  handleGetContent= asyncHandler(async(req, res)=> {
    const user = req.user;
    console.log('user')
    // get the user
    // find content for that user
    const contentList = await client.content.findMany({
        where:{
            userId:user.id
        }
    })
    if(!contentList){
        res.status(204).json(new ApiResponse(204,'No content available'))
    }
    res.status(200).json(new ApiResponse(200,'Content fetched successfully',contentList))
})

export {
    handleSaveContent,
    handleGetContent
}
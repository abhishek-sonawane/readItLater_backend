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

const handleRemoveContent  = asyncHandler(async(req,res)=>{
    const user = req.user
    const {id} = req.params
    if(!id){
        throw new ApiError(404,'Content Id not found')
    }
    const findContent = await client.content.findFirst({
        where:{
            userId:user.id,
            id:id
        }
    })
    if(!findContent){
        throw new ApiError(404,'Content not found')
    }
    // soft delete content
})

const handleAddContentToFolder = asyncHandler(async(req,res)=>{
    // get user
    const user = req.user
    // get contentID & folderID
    const {contentID , folderID} = req.params
    if(!contentID || !folderID){
        throw new ApiError(400, 'ContentId or folderId empty')
    }
    // check if the content and folder exist
    const doesContentExist = await client.content.findFirst({
        where:{
            userId:user.id,
            id:contentID
        }
    })

    if(!doesContentExist){
        throw new ApiError(404,'Content not found')
    }

    const doesFolderExist = await client.folder.findFirst({
        where:{
            userId:user.id,
            id:folderID
        }
    })
    if(!doesFolderExist){
        throw new ApiError(404,'Folder not found')
    }

    // check if the content is in the folder already
    if(doesContentExist.folderId==folderID){
        throw new ApiError(400, 'Content already exists in this folder')
    } 

    // add content to folder
    await client.content.update({
        where:{
            userId:user.id,
            id:contentID
        },
        data:{
            folderId:folderID
        }
    })
    res.status(200).json(new ApiResponse(
        200,
        'Content added to folder successfully!',
    ))
})
// TODO: COMPLETE CONTENTTOFOLDER OPERATIONS
const removeContentFromFolder = asyncHandler(async(req,res)=>{
    // get user
    // check contentID and folderID 
    // if contentID and folderID exist
    // remove content from folder
})

const moveContentToFolder = asyncHandler(async(req,res)=>{
    // get user
    // check contentID, newfolderID, prevFolderID
    // if contentexist, newfolderexist, prevfolderexist
    // move content from prev folder to new folder
})

export {
    handleSaveContent,
    handleGetContent,
    handleRemoveContent,
    handleAddContentToFolder,
    removeContentFromFolder,
    moveContentToFolder
}
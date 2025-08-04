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

    await client.content.update({
        where:{
            id,
            userId:user.id
        },
        data:{
            isDeleted:true
        }
    })
    res.status(200).json(new ApiResponse(
        200,
        'Content Removed successfully'
    ))

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

const removeContentFromFolder = asyncHandler(async(req,res)=>{
    // get user
    const user = req.user
    // check contentID and folderID 
      const {contentID , folderID} = req.params
    if(!contentID || !folderID){
        throw new ApiError(400, 'ContentID or folderID is empty')
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
    // remove content from folder

    await client.content.update({
        where:{
            id:contentID,
            userId:user.id
        },
        data:{
            folderId:null
        }
    })

    res.status(200).json(new ApiResponse(
        200,
        'Removed content from Folder',
    ))
})

const moveContentToFolder = asyncHandler(async(req,res)=>{
    // get user
    const user = req.user
    const {contentID,prevfolderID, newfolderID} = req.params
    // check contentID, newfolderID, prevFolderID
    if(!contentID || !prevfolderID || !newfolderID){
        throw new ApiError(400,'ContentID or newfolderID or prevfolderID is empty')
    }
    // check if content exists
    const contentExist = await client.content.findFirst({
        where:{
            userId:user.id,
            id:contentID
        }
    })
    if(!contentExist){
        throw new ApiError(404,'Content not found')
    }
    // check if new folder exists
    const newFolderExist = await client.folder.findFirst({
        where:{
            userId:user.id,
            id:newfolderID
        }
    })
    if(!newFolderExist){
        throw new ApiError(404,'New folder not found')
    }
    // check if prev folder exists

    const prevFolderExist = await client.folder.findFirst({
        where:{
            userId:user.id,
            id:prevfolderID
        }
    })
    if(!prevFolderExist){
        throw new ApiError(404,'Previous folder not found')
    }
    // check if content is already in the new folder
    if(contentExist.folderId === newfolderID){
        throw new ApiError(400,'Content already exists in the new folder')
    }
    // check if content is in the previous folder
    if(contentExist.folderId !== prevfolderID){
        throw new ApiError(400,'Content is not in the previous folder')
    }   
    // update content folderId to new folderId
    await client.content.update({
        where:{
            userId:user.id,
            id:contentID
        },
        data:{
            folderId:newfolderID
        }
    })

    res.status(200).json(new ApiResponse(
        200,
        'Content moved to new folder successfully',
    ))
    

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
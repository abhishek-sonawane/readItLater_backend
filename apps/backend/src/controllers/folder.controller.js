import { client } from "../lib/prisma.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const handleCreateFolder = asyncHandler(async(req,res)=>{
     if(!req.body){
        res.status(400).json(new ApiResponse(
            400,
            'empty body'
        ))
    }
    const {folderNameQuery} = req.body
    const user = req.user;
    if(!folderNameQuery){
        res.status(400).json(new ApiResponse(
            400,
            'empty folder name'
        ))
    }
    // check if a folder exists 
    // create folder if doesnt exist
    const doesFolderExist = await client.folder.findFirst({
        where:{
            userId:{
                equals:user.id
            },
            name:{
                equals:folderNameQuery
            }
        }
    })
    if(doesFolderExist){
        return res.status(409).json(new ApiResponse(409,'Folder with this name already exists!',{folderName:folderNameQuery}))
    }

    await client.folder.create({
        data:{
            name:folderNameQuery,
            userId:user.id
        }
    })

    res.status(200).json(new ApiResponse(200,'Folder created successfully',{
        folderName:folderNameQuery
    }))
})

const handleGetFolders = asyncHandler(async(req,res)=>{
    const user = req.user
    const userFolders = await client.folder.findMany({
        where:{
            userId:user.id,
        }

    })
    if(!userFolders){
        return res.status(204).json(new ApiResponse(204,'No folders made by this user'));
    }
     
    res.status(200).json(new ApiResponse(
        200,
        'Folders fetched successfully',
        userFolders
    ))

})

const handleUpdateFolder = asyncHandler(async(req,res)=>{
    if(!req.body){
        res.status(400).json(new ApiResponse(
            400,
            'empty body'
        ))
    }
    const user = req.user
    const {folderName} = req.body
    const {id:folderId} = req.params

    // check if the folder exist
    const folderExist = await client.folder.findFirst({
        where:{
            id: folderId
        }
    })
    if(!folderExist){
        throw new ApiError(400,'Folder doesnt exist!')
    }
    // check if user is authorized to update the resource
    // if (!folderExist.userId ==user.id){
    //     throw new ApiError(403,'you are not authorized to update this')
    // }
    
    // check if anything if sent request for changing foldername has some changes
    if(folderExist.name==folderName){
       return res.status(200).json(new ApiResponse(200,'no content changes'))
    }

    const updateFolder = await client.folder.update({
        where:{
            userId:user.id,
            id:folderId,
        },
        data:{
            name:folderName 
        }

    })

    res.status(200).json(new ApiResponse(200,'Folder updated Successfully!',{
        updateFolder
    }))

})

const handleDeleteFolder = asyncHandler(async(req,res)=>{
    // get user
    const user = req.user
    const {id} = req.params
    if(!id){
        throw new ApiError(404,'Folder Id not found!')
    }

    const folderExists = client.folder.findFirst({
        where:{
            // userId:user.id,
            id,
        }
    })
    if(!folderExists){
        throw new ApiError(400,'Invalid folder Id')
    }

    // get id 
    const deleteFolder = client.folder.update({
        where:{
            userId:user.id,
            id
        },
        data:{
            isDeleted:true
        },
    })

    return res.status(200).json(new ApiResponse(
        200,
        'Folder Deleted Successfully!',
        deleteFolder
    ))
})


export{
    handleCreateFolder,
    handleGetFolders,
    handleUpdateFolder,
    handleDeleteFolder
}
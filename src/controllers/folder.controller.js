import { client } from "../lib/prisma.js";
import ApiResponse from "../utils/ApiResponse.js";
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
            userId:user.id
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

export{
    handleCreateFolder,
    handleGetFolders
}
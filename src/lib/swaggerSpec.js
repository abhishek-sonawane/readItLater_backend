import swaggerJSDoc from "swagger-jsdoc";
import path from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const swaggerDefinition ={
    openapi: '3.0.0',
info: {
title: 'ReadItLater API',
version: '1.0.0',
description: 'My API Description',
},
}


const options = {
    swaggerDefinition,
    apis:[path.join(__dirname,'../routes/*.js')]
}


export const swaggerSpec = swaggerJSDoc(options)


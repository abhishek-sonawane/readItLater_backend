
import express from 'express';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express'
import cors from 'cors'
import { swaggerSpec } from './lib/swaggerSpec.js';

const app = express();
app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({ extended: true,limit:'16kb' }));
app.use(cookieParser())
app.use(cors())

// server swagger documentation
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerSpec))
app.use('/api/v1',router )

app.use((err,req,res,next)=>{
    console.log('error in global handler❗️',err)
    res.status(err.statusCode||500).json({ message: err.message ||'Something went wrong' });
})

process.on('unhandledRejection', err => {
    console.error('Unhandled Rejection:', err);
});
process.on('uncaughtException', err => {
    console.error('Uncaught Exception:', err);
});

export default app;
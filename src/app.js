
import express from 'express';
import router from './routes/index.js';

const app = express();

app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({ extended: true,limit:'16kb' }));

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
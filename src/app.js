
import express from 'express';
import router from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api',router )

process.on('unhandledRejection', err => {
    console.error('Unhandled Rejection:', err);
});
process.on('uncaughtException', err => {
    console.error('Uncaught Exception:', err);
});

export default app;
import queue from 'bull';
import { scraperProcessor } from './processor/scraperProcessor.js';
import {redisConfig } from '../constants.js';


const scraperQueue = new queue('scraperQueue', {
    redis: redisConfig
});

scraperQueue.process(scraperProcessor);


export default scraperQueue;
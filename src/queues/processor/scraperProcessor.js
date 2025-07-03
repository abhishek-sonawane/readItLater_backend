import { puppeteerService } from "../../services/puppeteerService.js";

export const scraperProcessor = async (job, done) => {
    try {
        const data = await puppeteerService(job.data.url);
        if (!data) {
            console.error(`Failed to scrape ${job.data.url}`);
            return done(new Error(`Failed to scrape ${job.data.url}`));
        }
        console.log(`Scraped content for ${job.data.url}:`, data.title);
        db.push(data)
        done(); // ✅ important!
    } catch (err) {
        console.log(`Error processing job ${job.id}:`, err);
        done(err); // or done(new Error('...'));
    }
}
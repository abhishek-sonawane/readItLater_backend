import puppeteer from "puppeteer";
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';

export async function puppeteerService(url) {
    let browser;
    try {
        browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        const html = await page.content();
        const content = await extractReadableContent(html, url);
        if (!content) {
            console.error(`Failed to extract content from ${url}`);
            throw new Error(` Puppeteer Failed to extract content from ${url}`);
        }
        return content

    }
    finally {
        if (browser) {
            await browser.close();
        }
    }
}

export async function extractReadableContent(html, url) {
    // try {
    const dom = new JSDOM(html, { url })
    const reader = new Readability(dom.window.document);
    const content = reader.parse();
    if (!content || !content.title || !content.textContent) {
        console.error('Failed to extract readable content from:', url);
        throw new Error(`Readibility Failed to extract readable content from: ${url}`);
    }


    return content;
    // } catch (error) {
    //     console.error(`Error extracting content from ${url}:`, error);
    //     return null;
    // }
}

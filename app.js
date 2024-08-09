
// const express = require('express');
// const puppeteer = require('puppeteer');
// const pupperteerCore = require('puppeteer-core');
import express from 'express';
import puppeteer from 'puppeteer';

const app = express();

app.use(express.json({limit: '20mb'}));

app.get('/', (req , res) => {
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.send('<h1>Bienvenue sur pupperteer</h1>');
});


app.get('/pdf', express.json({ limit: '20mb' }), async (req, res) => {
    try{
        await timer(5000);
        const pdfBuffer = await generatePDF(
            'https://www.frenchdetailers.com/company/e981b783-0d45-47fc-b8d6-0d718e190a4e'
        );
    }catch(e){
        return res.status(500).send(JSON.stringify(e));
    }


//   res.set('Content-Type', 'application/pdf');
//     res.set('Content-Disposition', 'attachment; filename="file.pdf"');
//     res.set('Content-Length', pdfBuffer.byteLength.toString());

//     res.end(pdfBuffer);
    res.send('PDF generated');
});



async function launchBrowser() {
    try{
        return await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox',
            ],
            defaultViewport: {
                width: 595,
                height: 842
            },
            ignoreHTTPSErrors: true,
            timeout: 20000,
        });
    }catch(e){
        console.error('Error launching browser:', error);
        throw e;
    }
}

async function generatePDF(url){
    try{	
        console.log('Generating PDFF...');
        const browser = await launchBrowser();
        console.log('New page');
        const page = await browser.newPage();
        // Capture les erreurs de console de la page
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
        console.log('Page created');

        await page.goto(url, { waitUntil: 'load', timeout: 10000 });
        console.log('Page loaded');

        const pdfBuffer = await page.pdf({ format: 'A4' });

        console.log('PDF generated');
        await browser.close();
        console.log('Browser closed');

        return pdfBuffer;
    }
    catch(e){
        console.error('Error taking screenshot:', error);
        throw e;
    }
}

// Fermer le navigateur proprement en cas d'arrêt du serveur
// process.on('SIGINT', async () => {
//     if (browser) {
//         await browser.close();
//     }
//     process.exit();
// });

async function timer(ms) {
	return new Promise(res => setTimeout(res, ms));
}


app.listen(3000);
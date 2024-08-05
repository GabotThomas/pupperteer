
const express = require('express');
const puppeteer = require('puppeteer');
// const pupperteerCore = require('puppeteer-core');

const app = express();

app.use(express.json({limit: '20mb'}));

app.get('/', (req , res) => {
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.send('<h1>Bienvenue sur pupperteer</h1>');
});


app.get('/pdf', express.json({ limit: '20mb' }), async (req, res) => {
    try{
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

async function generatePDF(url){
    try{	
        console.log('Generating PDF...');
        console.time('PDF generated in');
        console.time('Browser launched in');
        const browser = await puppeteer.launch(
            {
                // handleSIGHUP: false,
                // handleSIGTERM: false,
                args: [
                    '--no-sandbox', 
                    '--disable-setuid-sandbox', 
                    "--disable-dev-shm-usage",
                    "--single-process",
                    "--no-zygote"
                ],
                executablePath: '/usr/bin/google-chrome-stable',
                headless: true,
                timeout: 0
            }
        );
        console.log('Browser launched');
        console.timeEnd('Browser launched in');
        console.time('Page created in');
        const page = await browser.newPage();
        console.log('Page created');
        console.timeEnd('Page created in');
        await page.goto(url);
        console.log('Page loaded');
        const pdfBuffer = await page.pdf({ format: 'A4' });
        console.log('PDF generated');
        await browser.close();
        console.log('Browser closed');
        
        console.timeEnd('PDF generated in');

        return pdfBuffer;
    }
    catch(e){
        console.log(e);
        throw e;
    }
}

async function timer(ms) {
	return new Promise(res => setTimeout(res, ms));
}


app.listen(3000);
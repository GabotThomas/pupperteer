
const express = require('express');
const puppeteer = require('puppeteer');
const pupperteerCore = require('puppeteer-core');

const app = express();

app.use(express.json({limit: '20mb'}));

app.get('/', (req , res) => {
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.send('<h1>Bienvenue sur pupperteer</h1>');
});


app.get('/pdf', express.json({ limit: '20mb' }), async (req, res) => {
  console.log('Hello PDF');
  await timer(10000);
  const pdfBuffer = await generatePDF(
      'https://www.frenchdetailers.com/company/e981b783-0d45-47fc-b8d6-0d718e190a4e'
  );


  const headers = new Headers();

  headers.set('Content-Type', 'application/pdf');
  headers.set('Content-Disposition', 'attachment; filename="file.pdf"');
  headers.set('Content-Length', pdfBuffer.byteLength.toString());

  res.writeHead(200, headers);
  res.end(pdfBuffer);
});

async function generatePDF(url){
	// console.log 
	console.log('Generating PDF...');
	console.time('PDF generated in');
	const browser = await puppeteer.launch(
        {
            handleSIGHUP: false,
            handleSIGTERM: false
        }
    );
	const page = await browser.newPage();
	await page.goto(url);
	const pdfBuffer = await page.pdf({ format: 'A4' });
	await browser.close();
	
    console.timeEnd('PDF generated in');

    return pdfBuffer;
}

async function timer(ms) {
	return new Promise(res => setTimeout(res, ms));
}


app.listen(3000);
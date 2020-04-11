import puppeteer from 'puppeteer';

const browser = puppeteer.launch();

export const convertHTMLToPDF = async (html: string) => {
  let pdf: Buffer = undefined;

  const browserWSEndpoint = (await browser).wsEndpoint();

  const connBrowser = await puppeteer.connect({ browserWSEndpoint });

  const page = await connBrowser.newPage();
  await page.setContent(html);

  pdf = await page.pdf({ format: 'Letter' });

  connBrowser.disconnect();

  return pdf;
};

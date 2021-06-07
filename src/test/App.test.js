const puppeteer = require('puppeteer');

// test.js
const timeout = 100000;
const sleep = duration => new Promise(resolve => setTimeout(resolve, duration));
const sleeptime=1000

describe('Borrowaboat test tests', () => {
  beforeAll(async () => {
    const browser = await puppeteer.launch({
        headless: false,
          slowMo: 50, 
        defaultViewport: null
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/', {waitUntil: 'load'});
    // await page.goto(PATH, { waitUntil: 'load' })
  });

  it('Page Title = Nigel Skeels App for Borrowaboat', async () => {
    await expect(page.title()).resolves.toMatch('Nigel Skeels App for Borrowaboat');
    await sleep(sleeptime*3);
  });

  it('Help modal is visible', async () => {
      await page.waitForSelector('#scroll-dialog-title', {
        visible: true,
      })
    await sleep(sleeptime);
  });


  it('User can hide help modal', async () => {
    const but = await page.$('#dialoguemodalcloser');
    await but.evaluate( but => but.click() );
  },timeout);


  it('Adds category Electronics', async () => {
    // const Element = await page.$('#addtextfield');
    await page.type('#addtextfield', 'Electronics', {delay: 1})
    const but = await page.$('#additembutton');
    await but.evaluate( but => but.click() );
    const text = await page.evaluate(() => Array.from(document.querySelectorAll("input[value='Electronics']"), element => element.textContent));
    await sleep(sleeptime);
    expect(text.length!==0).toBeTruthy();
  },timeout);


  it('Adds 49-inch LCD, 40-inch plasma, and 32-inch CRT to category Electronics', async () => {
    
    const theid = await page.evaluate(() => Array.from(document.querySelectorAll("input[value='Electronics']"), element => element.id));
    let ariatofind = '[aria-label="'+theid[0]+'"]'
    const but = await page.$(ariatofind);
    await but.evaluate( but => but.firstChild.firstChild.click() );

    const addbut = await page.$('#additembutton');
    await page.type('#addtextfield', 'Adds 49-inch LCD', {delay: 30})
    await addbut.evaluate( addbut => addbut.click() );

    await page.type('#addtextfield', '40-inch plasma', {delay: 30})
    await addbut.evaluate( addbut => addbut.click() );

    await page.type('#addtextfield', '32-inch CRT to category Electronics', {delay: 30})
    await addbut.evaluate( addbut => addbut.click() );
    
    const found1 = await page.$('[value="Adds 49-inch LCD"]');
    const found2 = await page.$('[value="40-inch plasma"]');
    const found3 = await page.$('[value="32-inch CRT to category Electronics"]');
    await sleep(sleeptime);
    expect(found1 && found2 && found3).toBeTruthy();
  },timeout);


  
  it('Add category Gaming consoles and under this PS4 and XBox One', async () => {

    let theid = await page.evaluate(() => Array.from(document.querySelectorAll("input[value='Home']"), element => element.id));
    let ariatofind = '[aria-label="'+theid[0]+'"]'
    let but = await page.$(ariatofind);
    await but.evaluate( but => but.firstChild.firstChild.click() );
   
    await page.type('#addtextfield', 'Gaming consoles', {delay: 1})
    but = await page.$('#additembutton');
    await but.evaluate( but => but.click() );

    theid = await page.evaluate(() => Array.from(document.querySelectorAll("input[value='Gaming consoles']"), element => element.id));
    ariatofind2 = '[aria-label="'+theid[0]+'"]'
    but = await page.$(ariatofind2);
    await but.evaluate( but => but.firstChild.firstChild.click() );

    but = await page.$('#additembutton');
    await page.type('#addtextfield', 'PS4', {delay: 30})
    await but.evaluate( but => but.click() );

    await page.type('#addtextfield', 'XBox One', {delay: 30})
    await but.evaluate( but => but.click() );
    
    const found1 = await page.$('[value="PS4"]');
    const found2 = await page.$('[value="XBox One"]');
    await sleep(sleeptime);
    expect(found1 && found2).toBeTruthy();

  },timeout);


  it('Move Gaming consoles to sit under Electronics', async () => {

    let theid = await page.evaluate(() => Array.from(document.querySelectorAll("input[value='Gaming consoles']"), element => element.id));
    let ariatofind = '[aria-label="'+theid[0]+'"]'
    let but = await page.$(ariatofind);
    await but.evaluate( but => but.firstChild.firstChild.click() );

    but = await page.$('#movebutton');
    await but.evaluate( but => but.click() );

    theid = await page.evaluate(() => Array.from(document.querySelectorAll("input[value='Electronics']"), element => element.id));
    ariatofind = '[aria-label="'+theid[0]+'"]'
    but = await page.$(ariatofind);
    await but.evaluate( but => but.firstChild.firstChild.click() );

    but = await page.$('#pastebutton');
    await but.evaluate( but => but.click() );

    const found1 = await page.$('[value="PS4"]');
    const found2 = await page.$('[value="XBox One"]');
    await sleep(sleeptime);
    expect(found1 && found2).toBeTruthy();

  },timeout);


  it('Delete PS4', async () => {

    let theid = await page.evaluate(() => Array.from(document.querySelectorAll("input[value='PS4']"), element => element.id));
    let ariatofind = '[aria-label="'+theid[0]+'"]'
    let but = await page.$(ariatofind);
    await but.evaluate( but => but.firstChild.firstChild.click() );

    but = await page.$('#deletebutton');
    await but.evaluate( but => but.click() );

    const found1 = await page.$('[value="PS4"]');
    await sleep(sleeptime*2);
    expect(found1).toBeFalsy();

  },timeout);




  

  afterAll(() => {
    browser.close()
  })
});



//- He adds the category "Electronics", and under that, "Televisions".
//- To this category he adds the items "49-inch LCD", "40-inch plasma", and "32-inch CRT".
//- He adds the category "Gaming consoles", and under this, the items "PS4", "XBox One".
//- He edits "Gaming consoles" to sit under "Electronics".

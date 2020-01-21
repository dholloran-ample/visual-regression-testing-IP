const { percySnapshot } = require('@percy/puppeteer');
const { newE2EPage } = require("@stencil/core/testing");

describe('crds-image-title-cutout', () => {

  // Set content variables
  const imageUrl = 'https://crds-media.imgix.net/6Wuqirf5JxhZxBPQlwheZH/8cf6b62e7117846df347c086317c73c2/Screen_Shot_2019-10-10_at_3.26.57_PM.png?auto=format&ar=2.63&fit=crop';
  const imageHref = 'https://www.google.com/maps/place/Crossroads+Church+Oakley/@39.1594124,-84.4255232,17z/data=!3m1!4b1!4m5!3m4!1s0x8841ad6e8703e557:0x91d871185ba4400e!8m2!3d39.1594083!4d-84.4233345?hl=en';
  const cardTitle = 'Oakley';
  const titleHref = 'https://int.crossroads.net/oakley';
  const component = 
  `
    <div style="width:400px">
      <crds-image-title-cutout
      ${imageUrl ? "image-url=" + imageUrl : ''}
      ${imageHref ? "image-href=" + imageHref : ''} 
      ${cardTitle ? "card-title=" + cardTitle : ''} 
      ${titleHref ? "title-href=" + titleHref : ''}  
      >
      </crds-image-title-cutout>
    </div>
  `

  const createPage = async () => {
    // Create puppeteer page instance
    const page = await newE2EPage();

    // Inject crds-image-title-cutout into page
    (await page).setContent(component)

    return page
  }

  it('Renders', async () => {
    
    // Create page
    const page = await createPage();

    // Find component on DOM
    const el = await page.find('crds-image-title-cutout');
    expect(el).not.toBeNull();
    await percySnapshot(page, 'Component render' )
  })

  // //
  // it('Redirects to _ when I click on the title', async () => {

  //   const page = await createPage()
  //   const selector = '.text-uppercase.title-cutout'
  //   await page.click(selector)
  //   await page.waitForNavigation();

  // })

  // //
  // it('Redirects to _ when I click on the image', async () => {
  //   const page = await createPage()
  //   const selector = '.image'
  //   await page.click(selector)
  //   await page.waitForNavigation();
  // })

})
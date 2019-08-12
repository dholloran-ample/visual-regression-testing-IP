import { newE2EPage } from '@stencil/core/testing';
import { SiteHappenings } from './site-happenings';
// import '@stencil/core/internal';

describe('<crds-site-happenings>', () => {
  beforeEach(() => { //TODO should this be beforeEach?
    this.happenings = new SiteHappenings();
  });

  //this doesn't work
  it('Tests dropdown width changes based on selected site', async () => {
    const page = await newE2EPage();
    await page.setContent('<crds-site-happenings></crds-site-happenings>');
    const happeningsComponent = await page.find('crds-site-happenings');

    this.happenings.host = happeningsComponent;//Will setting to same object impact the page now?

    const dropdown = await page.find('crds-site-happenings >>> [data-automation-id="happenings-dropdown"]');
    console.log(`initial dropdown font ${dropdown.innerHTML}`);
    console.log(`happenings has host? ${this.happenings.host}`)
    console.log(`happenings has shadow root?? ${this.happenings.host.shadowRoot}`)

    this.happenings.setWidthBasedOnText(dropdown, 'This is a super long string oh my!');
    await page.waitForChanges();

    console.log(`initial dropdown font ${dropdown.innerHTML}`);


    // const dropdown = await page.find('crds-site-happenings >>> [data-automation-id="happenings-dropdown"]');
    const atr = dropdown.getAttribute('style')
    console.log(`atr = ${atr}`);

    // console.log(dropdown.getAttribute('style'))
    // dropdown.getComputedStyle().then(style => {
    //   // console.log(`style ${JSON.stringify(style)}`);
    //   console.log(`width ${style.width}`);
    // })
    // expect(dropdown.outerHTML).toMatch()

    // .then(style => {
    //   expect(style).toBe('width: 125px;');
    // })
  });

  it.skip('New promos should load when filter changes', async () => {
    const page = await newE2EPage();
    await page.setContent('<crds-site-happenings></crds-site-happenings>')
    const dropdown = await page.find('crds-site-happenings >>> [data-automation-id="happenings-dropdown"] > select');
    dropdown.getProperty('value').then(selectedSite => {
      expect(selectedSite).toBe('Churchwide');
    })

    // dropdown.click();

    //Select doesn't support shadow roots
    await page.select('crds-site-happenings >>> [data-automation-id="happenings-dropdown"] > select', 'Florence');
    // page.waitForChanges();
    // dropdown.getProperty('value').then(selectedSite => {
    //   expect(selectedSite).toBe('Florence');
    // })
//looks like the dropdown selection is internally handled and we can't tap into it
    //const florence = await page.find('crds-site-happenings >>> [data-automation-id="happenings-dropdown"] > option[value="Florence"]');

    // console.log(`value is ${selectedSite}`)
    // dropdown.getProperty('value').then(val => {
    //   console.log(`prop is ${val}`)
    // })
    // expect(selectedSite).toEqual('Churchwide');


    //get titles of promos displayed
    //open dropdown
    //select filter
    //get new titles - should not match
  });

  //Experimental to get this working
  it.skip('checks heart button click increase count', async () => {
    const page = await newE2EPage();
    await page.setContent('<crds-heart-button></crds-heart-button>')

    const heart = await page.find('crds-heart-button');

    const clickHeart = await page.find('crds-heart-button >>> a[href]');
    expect(clickHeart.className).toBe('off');

    const heartCount = await page.find('crds-heart-button >>> a[href] > .count');
    const initialCount = heartCount.textContent;
    expect(heartCount.textContent).toBe(initialCount);
    console.log(heartCount.outerHTML)

    clickHeart.click();
    await page.waitForChanges().then(() => {
      expect(clickHeart.className).toBe('on');
      // console.log(`when on ${heartCount.outerHTML}`)
    // expect(heartCount.textContent).toBe("1");
    });

    expect(clickHeart.className).toBe('on');
      console.log(`when on ${heartCount.outerHTML}`)
  });
});
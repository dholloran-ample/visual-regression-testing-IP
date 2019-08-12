import { SiteHappenings } from './site-happenings';
import { newSpecPage } from '@stencil/core/dist/testing';

describe('<crds-site-happenings>', () => {
  beforeEach(() => { //TODO should this be beforeEach?
    this.happenings = new SiteHappenings();
  });

//TODO host is the element the component it attached to, but is the component naturally scoped to itself?
// is there something just within the component class we could reference?
  describe('Tests things', () => {
    it('mySpecPage', async () => {
      const page = await newSpecPage({
        html: `<crds-site-happenings></crds-site-happenings>`,
        components: [SiteHappenings],
        supportsShadowDom: false
      });

      // page.root.shadowRoot.querySelector('[data-automation-id="happenings-dropdown"] > select');

      expect(page.root).toEqualHtml('<crds-site-happenings></crds-site-happenings>');
    });

    it.skip('Checks setWidthBasedOnText()', () => {
      console.log(`spec host info ${this.happenings.host}`)
      // const elem = this.happenings.host //.querySelector('.happenings-dropdown-select')
      // // console.log(`parent width ${elem.parentNode.style.width}`);
      // console.log(`what is? ${Object.keys(elem)}`);
      const fakeDiv = document.createElement('div');
      const fakeSelect = document.createElement('select');
      fakeDiv.appendChild(fakeSelect);
      console.log(`initial div font ${fakeDiv.style.fontSize}`);
      console.log(`initial select font ${fakeSelect.style.fontSize}`);

      this.happenings.setWidthBasedOnText(fakeSelect, 'Oakley', document);

      console.log(`initial div font ${fakeDiv.style.fontSize}`);
      console.log(`initial select font ${fakeSelect.style.fontSize}`);
    });
  });


  it.skip('should default to Churchwide for logged out users', () => {
    expect(this.happenings.selectedSite).toEqual('Churchwide');
    console.log(Object.keys(this.happenings));
  });

  describe.skip('Tests defaultToUserSite()', () => {
    const siteNotSet = ['Not site specific', 'I do not attend Crossroads', 'Anywhere', null, undefined]
    siteNotSet.forEach(site => {
      it(`defaultToUserSite(${site}) should set selectedSite to Churchwide`, () => {
        this.happenings.defaultToUserSite(site);
        expect(this.happenings.selectedSite).toEqual('Churchwide');
      });
    });

    //TODO - also tests trash values. What happens to other methods if site is trash?
    const userSiteSet = ['Oakley', 'Downtown Lexington', 'Fake Site', ['Array Site'], { name: 'Object Site' }]
    userSiteSet.forEach(site => {
      it(`defaultToUserSite(${site}) should set selectedSite to what was given`, () => {
        this.happenings.defaultToUserSite(site);
        expect(this.happenings.selectedSite).toEqual(site);
      });
    });
  });


  //TODO need to low level first?
  describe.skip('Tests handleSetDefaultSite()', () => {
    //Outline - what's used
    const event = {
      target: {
        value: 'something?',
        selectedIndex: 'int? string?',
        options: [{ text: 'value?' }]
      }
    }
    //What are valuse whn selecting a real site
    //What are values when selecting a site that'll default to Churchwide (and does the widgit throw an error?)
    it('Checks selectedSite ... valid site id', () => {
      //       event.target.value 1
      // event.target.selectedIndex 11

      //     event.target.options [object HTMLOptionsCollection]
      // event.target.options[event.target.selectedIndex].text Oakley
      //{name: "Oakley", id: "1"}
      const selectOakley = {
        target:
        {
          value: '1',
          selectedIndex: 11,
          options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, { text: 'Oakley' }]
        }
      };
      this.happenings.handleSetDefaultSite(selectOakley);
      expect(this.happenings.selectedSite).toEqual('Oakley');
    });
  });
  //These use defaultToUserSite:
  //fetchUserData, handleSetDefaultSite
  //change filter - check happenings list lists promos?

  //TODO test renders
  describe.skip('Test render html', () => {
    it('Checks renderSetSiteModal', () => {
      //TODO
    });
  });




});
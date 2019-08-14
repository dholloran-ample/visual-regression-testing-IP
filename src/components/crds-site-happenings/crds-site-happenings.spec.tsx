import { SiteHappenings } from './site-happenings';
import { newSpecPage } from '@stencil/core/dist/testing';

describe.skip('<crds-site-happenings>', () => {
  beforeEach(() => {
    this.happenings = new SiteHappenings();
  });

  //Working
  describe.skip('Tests defaultToUserSite()', () => {
    const siteNotSet = ['Not site specific', 'I do not attend Crossroads', 'Anywhere', null, undefined]
    siteNotSet.forEach(site => {
      it(`defaultToUserSite(${site}) should set selectedSite to Churchwide`, () => {
        this.happenings.defaultToUserSite(site);
        expect(this.happenings.selectedSite).toEqual('Churchwide');
      });
    });

    //TODO - also tests trash values. What happens to other methods if site is trash?
    const realSites = ['Oakley', 'Downtown Lexington']
    const fakeSites = ['Fake Site', ['Array Site'], { name: 'Object Site' }]
    const userSites = fakeSites.concat(realSites);
    userSites.forEach(site => {
      it(`defaultToUserSite(${site}) should set selectedSite to what was given`, () => {
        this.happenings.defaultToUserSite(site);
        expect(this.happenings.selectedSite).toEqual(site);
      });
    });
  });

  //NOTE graphql returns json, value can be a string in double quotes, or a number, or true or false or null. (or array/object)
  describe('Tests filterAndSortSites()', () => {
    it('Checks sites are sorted by name', () => {
      const given = [
        { "name": "Oakley", "id": "1" },
        { "name": "Mason", "id": "100" },
        { "name": "I do not attend Crossroads", "id": "2" },
        { "name": "Mason", "id": "6" }
      ];

      const expected = [
        { "name": "I do not attend Crossroads", "id": "2" },
        { "name": "Mason", "id": "100" },
        { "name": "Mason", "id": "6" },
        { "name": "Oakley", "id": "1" }
      ]

      const goodSites = this.happenings.filterAndSortSites(given);

      expect(Array.isArray(goodSites)).toBe(true);
      expect(goodSites.length).toEqual(expected.length);

      goodSites.forEach(function (site, i) {
        expect(site.id).toEqual(expected[i].id);
        expect(site.name).toEqual(expected[i].name);
      });
    });

    //null, boolean and int are valid JSON values
    it("Checks non-string site names are removed", () => {
      const given = [
        { "name": "Mason", "id": "6" },
        { "name": null, "id": "1" },
        { "name": "I do not attend Crossroads", "id": "2" },
        { "name": true, "id": "111" },
        { "name": false, "id": "11" },
        { "name": 12455, "id": "1111" },
        { "name": undefined, "id": "1" }
      ];

      const expected = [
        { "name": "I do not attend Crossroads", "id": "2" },
        { "name": "Mason", "id": "6" }
      ]

      const goodSites = this.happenings.filterAndSortSites(given);

      expect(Array.isArray(goodSites)).toBe(true);
      expect(goodSites.length).toEqual(expected.length);

      goodSites.forEach(function (site, i) {
        expect(site.id).toEqual(expected[i].id);
        expect(site.name).toEqual(expected[i].name);
      });
    });

    it("Checks excluded site names are removed", () => {
      const given = [
        { "name": "Oakley", "id": "1" },
        { "name": "Not site specific", "id": "123" },
        { "name": "I do not attend Crossroads", "id": "2" },
        { "name": "Xroads Church", "id": "1111" }
      ];

      const expected = [
        { "name": "I do not attend Crossroads", "id": "2" },
        { "name": "Oakley", "id": "1" },
      ]

      const goodSites = this.happenings.filterAndSortSites(given);

      expect(Array.isArray(goodSites)).toBe(true);
      expect(goodSites.length).toEqual(expected.length);

      goodSites.forEach(function (site, i) {
        expect(site.id).toEqual(expected[i].id);
        expect(site.name).toEqual(expected[i].name);
      });
    });

    //Scenario is possible if retrievning MP sites fails
    it("Checks empty array is returned if given", () => {
      const given = [];
      const goodSites = this.happenings.filterAndSortSites(given);

      expect(Array.isArray(goodSites)).toBe(true);
      expect(goodSites.length).toEqual(0);
    });
  });

  describe('Tests renderSetSiteOptions()', () => {
    const expectedSites = {
      "data":
      {
        "sites":
          [
            { "name": "Oakley", "id": "1" },
            { "name": "I do not attend Crossroads", "id": "2" },
            { "name": "Mason", "id": "6" },
            { "name": "Florence", "id": "7" },
            { "name": "West Side", "id": "8" },
            { "name": "Uptown", "id": "11" },
            { "name": "Anywhere", "id": "15" },
            { "name": "Oxford", "id": "16" },
            { "name": "East Side", "id": "17" },
            { "name": "Georgetown", "id": "18" },
            { "name": "Richmond", "id": "19" },
            { "name": "Lexington", "id": "21" },
            { "name": "Dayton", "id": "22" },
            { "name": "Columbus", "id": "23" },
            { "name": "Downtown Lexington", "id": "24" }
          ]
      }
    }

    //sorts, removes some sites, returns a list of <options>
    it('Checks options list generated with site names and ids', () => {
      const given = [
        { "name": "Mason", "id": "100" },
        { "name": null, "id": "1" },
        { "name": "I do not attend Crossroads", "id": "2" },
        { "name": true, "id": "111" },
        { "name": false, "id": "11" },
        { "name": "Mason", "id": "6" },
        { "name": 12455, "id": "1111" },        ,
        { "name": "Xroads Church", "id": "1111" },
        { "name": "Oakley", "id": "1" }
      ];

      const expected = [
        { "name": "I do not attend Crossroads", "id": "2" },
        { "name": "Mason", "id": "100" },
        { "name": "Mason", "id": "6" },
        { "name": "Oakley", "id": "1" }
      ]

      const rendered = this.happenings.renderSetSiteOptions(given);

      expect(Array.isArray(rendered)).toBe(true);
      expect(rendered.length).toEqual(expected.length);

      rendered.forEach(function (option, i) {
        let attr = option['$attrs$'];
        expect(attr.value).toEqual(expected[i].id);
        expect(attr['data-name']).toEqual(expected[i].name);
      });
    });

    //Scenario is possible if retrievning MP sites fails
    it("Checks options list is empty if no sites exist", () => {
      const given = [];
      const goodSites = this.happenings.renderSetSiteOptions(given);

      expect(Array.isArray(goodSites)).toBe(true);
      expect(goodSites.length).toEqual(0);
    });
  });

  //TODO - add this once store selected site testing
  describe('Tests handleSetSiteInput()', () => {

  });

  it.skip('test', () => {
    console.log(this.happenings.sites);
  })
  //NOTE - when rendered without auth, there is no graphql call to get the sites - where does the default list of sites come from? it comes from contentful audiences
  //The filtered list is retrieved from contentful's target audiences
  //the mp list where you can select your site is retrieved from MP's sites. The two do not feed into the same dropdowns.
  //NOTE you can currently select your site as "undefined" and it'll try to send it to MP
  //TODO can we assume that if a list of sites is seen it is in the correct format? basically could a method be called in a live environment with a bad formatted array of sites?
});

describe('<crds-site-happenings> GraphQL', () => {
  beforeEach(() => { //TODO should this be beforeEach?
    this.happenings = new SiteHappenings();
  });

  describe('Tests updateUserSite()', () => {

  });
});

//TODO as e2e or in rendered component:
//handleSetSiteModalClose
import { SiteHappenings } from './site-happenings';
// import { newSpecPage } from '@stencil/core/dist/testing';

describe('<crds-site-happenings>', () => {
  beforeEach(() => {
    this.happenings = new SiteHappenings();
    });

  //Working
  describe('Tests setSelectedSite()', () => {
    //TODO - also tests trash values. What happens to other methods if site is trash?
    const notAllowedSiteNames = ['Not site specific', 'I do not attend Crossroads', 'Anywhere', null, undefined, ['Array Site'], { name: 'Object Site' }]
    notAllowedSiteNames.forEach(siteNames => {
      it(`setSelectedSite(${siteNames}) should set selectedSite to Churchwide`, () => {
        this.happenings.setSelectedSite(siteNames);
        expect(this.happenings.selectedSite).toEqual('Churchwide');
      });
    });

    const siteNames = ['Oakley', 'Downtown Lexington', 'Fake Site']
    siteNames.forEach(siteNames => {
      it(`setSelectedSite(${siteNames}) should set selectedSite to what was given`, () => {
        this.happenings.setSelectedSite(siteNames);
        expect(this.happenings.selectedSite).toEqual(siteNames);
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
      expect(goodSites).toHaveLength(0);
    });
  });

  describe('Tests setHappenings()', () => {
    it('Checks happenings are stored', () => {
      const promos = [
        {
          "title": "Worship Training",
          "image": null,
          "description": "We believe that everyone has the potential to be great. Whether a musician or technician, you’ll get reps on our stages with our gear and training from our team. __[Learn more and sign up.](https://www.crossroads.net/worshiptraining)__\n",
          "targetAudience": ["Dayton"],
          "linkUrl": "https://int.crossroads.net/worshiptraining"
        },
        {
          "title": "Lead a Group",
          "image":
            { "url": "https://images.ctfassets.net/y3a9myzsdjan/5Q4VLfl6taIAKMsoKwCoI0/83a11ed394b74eb253903625d035794d/crossroads-groups.jpg" },
          "description": "Leading a group is a big deal. You’re moving people closer to God with the vision he’s given you for your group, and by caring about each person you lead. You don’t have to be a spiritual guru, just interested in following God yourself and helping others do the same. [__Apply to lead a group here.__](https://www.crossroads.net/groups/leader-overview/)",
          "targetAudience": ["Oxford"],
          "linkUrl": "https://int.crossroads.net/groups/leader-overview/"
        }
      ]

      expect(this.happenings.happenings).toHaveLength(0);
      this.happenings.setHappenings(promos);
      expect(this.happenings.happenings).toHaveLength(promos.length);
    });

    it('Checks happenings without audiences are not stored', () => {
      const promos = [
        {
          "title": "Worship Training",
          "image": null,
          "description": "We believe that everyone has the potential to be great. Whether a musician or technician, you’ll get reps on our stages with our gear and training from our team. __[Learn more and sign up.](https://www.crossroads.net/worshiptraining)__\n",
          "targetAudience": ["Dayton"],
          "linkUrl": "https://int.crossroads.net/worshiptraining"
        },
        {
          "title": "Lead a Group",
          "image":
            { "url": "https://images.ctfassets.net/y3a9myzsdjan/5Q4VLfl6taIAKMsoKwCoI0/83a11ed394b74eb253903625d035794d/crossroads-groups.jpg" },
          "description": "Leading a group is a big deal. You’re moving people closer to God with the vision he’s given you for your group, and by caring about each person you lead. You don’t have to be a spiritual guru, just interested in following God yourself and helping others do the same. [__Apply to lead a group here.__](https://www.crossroads.net/groups/leader-overview/)",
          "targetAudience": null,
          "linkUrl": "https://int.crossroads.net/groups/leader-overview/"
        }
      ]

      this.happenings.setHappenings(promos);
      expect(this.happenings.happenings).toHaveLength(1);
    });

    it('Checks does not break if given an empty list', () => {
      this.happenings.setHappenings([]);
      expect(this.happenings.happenings).toHaveLength(0);
    });
  });

  describe('Tests setContentfulSites()', () => {
    it('Checks contentful sites are stored', () => {
      const fakePromos = [
        {
          "targetAudience": ["Dayton"]
        },
        {
          "targetAudience": ["Oxford"]
        }
      ]

      this.happenings.happenings = fakePromos;
      this.happenings.setContentfulSites();
      expect(this.happenings.cflSites).toHaveLength(2);
      expect(this.happenings.cflSites).toEqual(["Dayton", "Oxford"]);
    });

    it('Checks site list is sorted and contains no duplicates', () => {
      const fakePromos = [
        {
          "targetAudience": ["Dayton"]
        },
        {
          "targetAudience": ["Oakley", "Florence", "Dayton"]
        }
      ]

      this.happenings.happenings = fakePromos;
      this.happenings.setContentfulSites();
      expect(this.happenings.cflSites).toHaveLength(3);
      expect(this.happenings.cflSites).toEqual(["Dayton", "Florence", "Oakley"]);
    });

    it('Checks does not break if happenings list is empty', () => {
      this.happenings.happenings = []
      this.happenings.setContentfulSites();
      expect(this.happenings.cflSites).toHaveLength(0);
    });
  });

  //raw promo list after filtering out those without audiences
  const rawPromos = [
    {
      "title": "Worship Training",
      "image": null,
      "description": "We believe that everyone has the potential to be great. Whether a musician or technician, you’ll get reps on our stages with our gear and training from our team. __[Learn more and sign up.](https://www.crossroads.net/worshiptraining)__\n",
      "targetAudience": ["Dayton"],
      "linkUrl": "https://int.crossroads.net/worshiptraining"
    },
    { "title": "Lead a Group", "image": { "url": "https://images.ctfassets.net/y3a9myzsdjan/5Q4VLfl6taIAKMsoKwCoI0/83a11ed394b74eb253903625d035794d/crossroads-groups.jpg" }, "description": "Leading a group is a big deal. You’re moving people closer to God with the vision he’s given you for your group, and by caring about each person you lead. You don’t have to be a spiritual guru, just interested in following God yourself and helping others do the same. [__Apply to lead a group here.__](https://www.crossroads.net/groups/leader-overview/)", "targetAudience": ["Oxford"], "linkUrl": "https://int.crossroads.net/groups/leader-overview/" },
    { "title": "Onsite Chaser Groups", "image": { "url": "https://images.ctfassets.net/y3a9myzsdjan/3e3V1fPTaVViuhvRZz6K6i/a321cbee7d61b4f1fd3f5b8e93107c6e/group_happenings2.jpg" }, "description": "__Sundays at 1pm in Meeting Room C__\n\nOnsite Chaser Groups are the easiest ways to meet new people and make this place feel smaller. All you need to do is watch the weekend message, then show up!", "targetAudience": ["Oakley"], "linkUrl": "https://int.crossroads.net/oakley" },
    { "title": "Onsite Chaser Groups", "image": { "url": "https://images.ctfassets.net/y3a9myzsdjan/3e3V1fPTaVViuhvRZz6K6i/a321cbee7d61b4f1fd3f5b8e93107c6e/group_happenings2.jpg" }, "description": "__Tuesdays starting 2/26 from 7–8:30pm in the Student Section__\n\nOnsite Chaser Groups are the easiest ways to meet new people and make this place feel smaller. All you need to do is watch the weekend message, then show up!", "targetAudience": ["East Side"], "linkUrl": "https://int.crossroads.net/eastside" },
    { "title": "Onsite Chaser Groups", "image": { "url": "https://images.ctfassets.net/y3a9myzsdjan/3e3V1fPTaVViuhvRZz6K6i/a321cbee7d61b4f1fd3f5b8e93107c6e/group_happenings2.jpg" }, "description": "__Sundays starting 2/17 at 4:30pm__\n\nOnsite Chaser Groups are the easiest ways to meet new people and make this place feel smaller. All you need to do is watch the weekend message, then show up!", "targetAudience": ["Lexington"], "linkUrl": "https://int.crossroads.net/lexington" },
    { "title": "Onsite Groups", "image": { "url": "https://images.ctfassets.net/y3a9myzsdjan/4DH2YKDAPovfGf07J7Jwkq/82cc448cc3418ac4474c8aae0834ec49/Untitled_design__11_.jpg" }, "description": "Onsite Groups connect people in similar life stages like young adults or moms, or around a topic like body image, overcoming addiction, or understanding the Bible. [__See what Groups are happening now and sign up here.__](https://www.crossroads.net/georgetownonsitegroups/)", "targetAudience": ["Georgetown"], "linkUrl": "https://int.crossroads.net/georgetownonsitegroups/" },
    { "title": "Spring Onsite Classes", "image": { "url": "https://images.ctfassets.net/y3a9myzsdjan/3w49DBU52EUyyn6bgjp8tj/216409844ce3cd0455f765472fe91644/Untitled_design__1_.jpg" }, "description": "These onsite classes are designed to cover a variety of topics to enhance your skills, understanding, and development. All classes are held at Outpost (406 E Withrow Street). [__Learn more about each class and sign up here.__](https://www.crossroads.net/oxfordonsiteclasses)", "targetAudience": ["Oxford"], "linkUrl": "https://int.crossroads.net/oxfordonsiteclasses" }]


  describe('Tests fetchContentfulData()', () => {
    //NOTE this query is dependent on contentful environment variables being set correctly
    //NOTE this assumes at least one with audience exists
    it('Checks happenings and Contentful sites are stored', async () => {
      expect(this.happenings.happenings).toHaveLength(0);
      expect(this.happenings.cflSites).toHaveLength(0);

      await this.happenings.fetchContentfulData();

      expect(this.happenings.happenings.length).toBeGreaterThan(0);
      expect(this.happenings.cflSites.length).toBeGreaterThan(0);
    });
  });


  //NOTE graphql returns json, value can be a string in double quotes, or a number, or true or false or null. (or array/object)
  describe('Tests setMPSites()', () => {
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

      expect(this.happenings.mpSites).toHaveLength(0);
      this.happenings.setMPSites(given);

      expect(this.happenings.mpSites).toHaveLength(expected.length);

      this.happenings.mpSites.forEach(function (site, i) {
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

      this.happenings.setMPSites(given);

      expect(this.happenings.mpSites).toHaveLength(expected.length);

      this.happenings.mpSites.forEach(function (site, i) {
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

      this.happenings.setMPSites(given);

      expect(this.happenings.mpSites).toHaveLength(expected.length);

      this.happenings.mpSites.forEach(function (site, i) {
        expect(site.id).toEqual(expected[i].id);
        expect(site.name).toEqual(expected[i].name);
      });
    });

    //Scenario is possible if retrievning MP sites fails
    it("Checks empty array is returned if given", () => {
      const given = [];

      this.happenings.setMPSites(given);
      expect(this.happenings.mpSites).toHaveLength(0);
    });
  });



  describe('Tests fetchSitesData()', () => {
    //NOTE this query is dependent on contentful environment variables being set correctly
    //NOTE this assumes at least one with audience exists
    it('Checks MP sites are stored', async () => {
      expect(this.happenings.mpSites).toHaveLength(0);

      //TODO need a way to get updated auth tokens  - see auth service tests
      const authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ijkyc3c1bmhtbjBQS3N0T0k1YS1nVVZlUC1NWSIsImtpZCI6Ijkyc3c1bmhtbjBQS3N0T0k1YS1nVVZlUC1NWSJ9.eyJpc3MiOiJGb3JtcyIsImF1ZCI6IkZvcm1zL3Jlc291cmNlcyIsImV4cCI6MTU2NTgxOTc1NiwibmJmIjoxNTY1ODE3OTU2LCJjbGllbnRfaWQiOiJDUkRTLkNvbW1vbiIsInNjb3BlIjpbImh0dHA6Ly93d3cudGhpbmttaW5pc3RyeS5jb20vZGF0YXBsYXRmb3JtL3Njb3Blcy9hbGwiLCJvZmZsaW5lX2FjY2VzcyIsIm9wZW5pZCJdLCJzdWIiOiJkMjVjYjY3Ny1kNTI2LTQ5MjYtYmE5Zi02YWZiNjY0MjhhZGUiLCJhdXRoX3RpbWUiOjE1NjU4MTc5NTYsImlkcCI6Imlkc3J2IiwibmFtZSI6ImNvbGVjYXRAZ21haWwuY29tIiwiYW1yIjpbInBhc3N3b3JkIl19.tRcUiEdzFX2w12o7ZRvPrHEG_Qek5xz7HkwxGV5wxCAY1beEqIyFzGpNhShOcHIjQ32LSc_guo2-MSls-vewLFk6sUtthQ8UvQiKyo6XM4RCPakkel-dxLMgs50SfLb7wnlgPoYBOOEMNHLRv5FvZEWFGmGF_yfuEVSMdZV1Er0v6OSN5FSW18TXACdvhAwJuLusMj6AeOyObiQDzVSrcM6uiSDwxmQzqUyXlpBiaGdJHXTnorDQ8j0nSvdW5vPPtSsmtxCUEgkihit2X6mfZlsyfgGXSvZneSiNQD9TC1lTscv-67Iy8xbR_dqJlPNYi7juKaE_ahJAXAhtwQbS_g';
      await this.happenings.fetchSitesData(authToken);

      expect(this.happenings.mpSites.length).toBeGreaterThan(0);
    });

    //TODO this prints the console error - is there a way in puppet to mute the console.error channel in a test?
    it.skip('Checks MP sites are not stored if not authenticated', async () => {
      expect(this.happenings.mpSites).toHaveLength(0);

      const fakeAuthToken = '';
      await this.happenings.fetchSitesData(fakeAuthToken);

      expect(this.happenings.mpSites).toHaveLength(0);
    });
  });

  //TODO - add this once store selected site testing
  describe.skip('Tests handleSetSiteInput()', () => {

  });

  //TODO - separate the call from the error handling so can test results of call?
  describe.skip('Tests updateUserSite()', () => {

  });

  it.skip('test', () => {
    console.log(this.happenings.sites);
  })

  //NOTE you can currently select your site as "undefined" and it'll try to send it to MP
  //TODO can we assume that if a list of sites is seen it is in the correct format? basically could a method be called in a live environment with a bad formatted array of sites?
  //TODO need to formalize the logic around setting the user.site and setting the selectedSite - there are discrepencies. Remember selected site updates the widgit.
});


//TODO as e2e or in rendered component:
//handleSetSiteModalClose

//Asked & answered
//NOTE - when rendered without auth, there is no graphql call to get the sites - where does the default list of sites come from? it comes from contentful audiences
//The filtered list is retrieved from contentful's target audiences
//the mp list where you can select your site is retrieved from MP's sites. The two do not feed into the same dropdowns.
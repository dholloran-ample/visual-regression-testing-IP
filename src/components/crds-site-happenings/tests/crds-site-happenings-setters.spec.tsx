import { SiteHappenings } from '../site-happenings';

describe('<crds-site-happenings>', () => {
  beforeEach(() => {
    this.happenings = new SiteHappenings();
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


  describe('Tests setUserSite()', () => {
    it('Checks user site is stored', () => {
      expect(this.happenings.user.site).toBe("");

      const validSite = "Oakley";
      this.happenings.setUserSite(validSite);

      expect(this.happenings.user.site).toBe(validSite);
    });

    const invalidSites = [undefined, null, ""];
    invalidSites.forEach(badSite => {
      it(`Checks user site is not changed if given ${badSite}`, () => {
        const oldSite = "Oakley";
        this.happenings.user.site = oldSite;
        expect(this.happenings.user.site).toBe(oldSite);

        this.happenings.setUserSite(badSite);

        expect(this.happenings.user.site).toBe(oldSite);
      });
    });
  });

  describe('Tests setSelectedSite()', () => {
    //TODO - also tests trash values. What happens to other methods if site is trash?
    const notAllowedSiteNames = ['Not site specific', 'I do not attend Crossroads', 'Anywhere', "", null, undefined, ['Array Site'], { name: 'Object Site' }]
    notAllowedSiteNames.forEach(siteName => {
      it(`setSelectedSite(${siteName}) should set selectedSite to Churchwide`, () => {
        this.happenings.setSelectedSite(siteName);
        expect(this.happenings.selectedSite).toEqual('Churchwide');
      });
    });

    const siteNames = ['Oakley', 'Downtown Lexington', 'Fake Site']
    siteNames.forEach(siteName => {
      it(`setSelectedSite(${siteName}) should set selectedSite to what was given`, () => {
        this.happenings.setSelectedSite(siteName);
        expect(this.happenings.selectedSite).toEqual(siteName);
      });
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
      expect(this.happenings.contentfulSites).toHaveLength(2);
      expect(this.happenings.contentfulSites).toEqual(["Dayton", "Oxford"]);
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
      expect(this.happenings.contentfulSites).toHaveLength(3);
      expect(this.happenings.contentfulSites).toEqual(["Dayton", "Florence", "Oakley"]);
    });

    it('Checks does not break if happenings list is empty', () => {
      this.happenings.happenings = []
      this.happenings.setContentfulSites();
      expect(this.happenings.contentfulSites).toHaveLength(0);
    });
  });
})
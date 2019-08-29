import { SiteHappenings } from '../site-happenings';

describe('<crds-site-happenings> Event handlers', () => {
  beforeEach(() => {
    this.happenings = new SiteHappenings();
    this.happenings.contentfulSites = ["Churchwide","Columbus","Dayton","Downtown Lexington","East Side","Florence","Georgetown","Lexington","Mason","Oakley","Oxford","Richmond","Uptown","West Side"]
    this.analyticsEvent = {};

    //Mock analytics call method and store values locally
    this.happenings.analytics.track = (name, data) => {
      this.analyticsEvent.name = name;
      this.analyticsEvent.data = data
    };
  });

  describe('Tests handleSiteSelection()', () => {
    it('Checks site selected and analytics data sent', () => {
      expect(this.happenings.selectedSite).toEqual('Churchwide');

      let fakeEvent = { target: { value: "Oakley" } }
      this.happenings.handleSiteSelection(fakeEvent);

      expect(this.happenings.selectedSite).toEqual('Oakley');

      expect(this.analyticsEvent.name).toBe('HappeningSiteFiltered');

      expect(this.analyticsEvent.data).not.toBeUndefined();
      const analyticsData = this.analyticsEvent.data;
      expect(analyticsData.site).not.toBeUndefined();
    });

    const notAllowedSiteNames = ['Not site specific', 'I do not attend Crossroads', 'Anywhere', 'Fake Site']
    notAllowedSiteNames.forEach(siteName => {
      it(`Checks selecting ${siteName} should set selectedSite to Churchwide`, () => {
        expect(this.happenings.selectedSite).toEqual('Churchwide');

        let fakeEvent = { target: { value: siteName } }
        this.happenings.handleSiteSelection(fakeEvent);

        expect(this.happenings.selectedSite).toEqual('Churchwide');

        const analyticsData = this.analyticsEvent.data;
        expect(analyticsData.site).toEqual('Churchwide');
      });
    });

    const siteNames = ['Oakley', 'Downtown Lexington']
    siteNames.forEach(siteName => {
      it(`Checks selecting ${siteName} should set selectedSite to what was given`, () => {
        expect(this.happenings.selectedSite).toEqual('Churchwide');

        let fakeEvent = { target: { value: siteName } }
        this.happenings.handleSiteSelection(fakeEvent);

        expect(this.happenings.selectedSite).toEqual(siteName);

        const analyticsData = this.analyticsEvent.data;
        expect(analyticsData.site).toEqual(siteName);
      });
    });
  });

  describe('Tests handleHappeningsClicked()', () => {
    it('Checks analytics event is sent with expected parameters', () => {
      const fakeEvent = {
        target:
        {
          innerText: "fake inner text",
          href: 'int.crossroads.net',
          tagName: 'A'
        }
      }

      expect(this.analyticsEvent.name).toBeUndefined();
      expect(this.analyticsEvent.data).toBeUndefined();

      this.happenings.handleHappeningsClicked(fakeEvent)

      expect(this.analyticsEvent.name).toBe('HappeningCardClicked');

      expect(this.analyticsEvent.data).not.toBeUndefined();
      const analyticsData = this.analyticsEvent.data.params;
      expect(analyticsData.title).not.toBeUndefined();
      expect(analyticsData.url).not.toBeUndefined();
      expect(analyticsData.userSite).not.toBeUndefined();
      expect(analyticsData.selectedSite).not.toBeUndefined();
    });

    it('Checks values sent to analytics when user clicks an "A" tag link', () => {
      const fakeEvent = {
        target:
        {
          innerText: "East Side",
          href: "int.crossroads.net",
          tagName: 'A'
        }
      }

      const expectedAnalytics = {
        title: 'east side',
        url: 'int.crossroads.net',
        userSite: 'logged out',
        selectedSite: 'Churchwide'
      }

      this.happenings.handleHappeningsClicked(fakeEvent)

      const analyticsData = this.analyticsEvent.data.params;
      expect(analyticsData.title).toEqual(expectedAnalytics.title);
      expect(analyticsData.url).toEqual(expectedAnalytics.url);
      expect(analyticsData.userSite).toEqual(expectedAnalytics.userSite);
      expect(analyticsData.selectedSite).toEqual(expectedAnalytics.selectedSite);
    });

    it('Checks values sent to analytics when user clicks link without an "A" tag', () => {
      const fakeEvent = {
        target:
        {
          innerText: "fake inner text",
          tagName: 'div',
          alt: "East Side",
          parentNode: {
            href: "int.crossroads.net"
          }
        }
      }

      const expectedAnalytics = {
        title: 'east side',
        url: 'int.crossroads.net',
        userSite: 'logged out',
        selectedSite: 'Churchwide'
      }

      this.happenings.handleHappeningsClicked(fakeEvent)

      const analyticsData = this.analyticsEvent.data.params;
      expect(analyticsData.title).toEqual(expectedAnalytics.title);
      expect(analyticsData.url).toEqual(expectedAnalytics.url);
      expect(analyticsData.userSite).toEqual(expectedAnalytics.userSite);
      expect(analyticsData.selectedSite).toEqual(expectedAnalytics.selectedSite);
    });

    it('Checks values sent to analytics when user has a site', () => {
      this.happenings.user.site = "Oakley"
      const fakeEvent = {
        target:
        {
          innerText: "fake inner text",
          tagName: 'div',
          alt: "East Side",
          parentNode: {
            href: "int.crossroads.net"
          }
        }
      }

      const expectedAnalytics = {
        title: 'east side',
        url: 'int.crossroads.net',
        userSite: 'Oakley',
        selectedSite: 'Churchwide'
      }

      this.happenings.handleHappeningsClicked(fakeEvent)

      const analyticsData = this.analyticsEvent.data.params;
      expect(analyticsData.userSite).toEqual(expectedAnalytics.userSite);
      expect(analyticsData.title).toEqual(expectedAnalytics.title);
      expect(analyticsData.url).toEqual(expectedAnalytics.url);
      expect(analyticsData.selectedSite).toEqual(expectedAnalytics.selectedSite);
    });

    it('Checks values sent to analytics when user has no site', () => {
      this.happenings.user.site = ""
      const fakeEvent = {
        target:
        {
          innerText: "fake inner text",
          tagName: 'div',
          alt: "East Side",
          parentNode: {
            href: "int.crossroads.net"
          }
        }
      }

      const expectedAnalytics = {
        title: 'east side',
        url: 'int.crossroads.net',
        userSite: 'logged out',
        selectedSite: 'Churchwide'
      }

      this.happenings.handleHappeningsClicked(fakeEvent)

      const analyticsData = this.analyticsEvent.data.params;
      expect(analyticsData.userSite).toEqual(expectedAnalytics.userSite);
      expect(analyticsData.title).toEqual(expectedAnalytics.title);
      expect(analyticsData.url).toEqual(expectedAnalytics.url);
      expect(analyticsData.selectedSite).toEqual(expectedAnalytics.selectedSite);
    });
  });

  describe('Tests handleSetSiteInput()', () => {
    beforeEach(() => {
      //Mock methods called by handleSetSiteInput to avoid failures
      this.happenings.handleSetSiteModalClose = () => { }; //Interacts with the DOM
      this.happenings.setUserSite = () => { }; //Requires auth
    });

    it('Checks selected and user sites changed and analytics event sent', () => {
      const fakeEvent = {
        target: {
          value: '1',
          selectedIndex: 0,
          options: [
            { text: 'Oakley' }]
        }
      };

      expect(this.happenings.selectedSite).toBe('Churchwide');
      expect(this.happenings.user.site).toBe('');

      this.happenings.handleSetSiteInput(fakeEvent);

      expect(this.happenings.selectedSite).toBe('Oakley');
      expect(this.happenings.user.site).toBe('Oakley');

      expect(this.analyticsEvent.name).toBe('HappeningSiteUpdated');

      expect(this.analyticsEvent.data).not.toBeUndefined();
      const analyticsData = this.analyticsEvent.data;
      expect(analyticsData.id).not.toBeUndefined();
      expect(analyticsData.name).not.toBeUndefined();
    });

    it('Checks values sent to analytics', () => {
      const fakeEvent = {
        target: {
          value: '1',
          selectedIndex: 0,
          options: [
            { text: 'Oakley' }]
        }
      };

      this.happenings.handleSetSiteInput(fakeEvent);

      expect(this.analyticsEvent.data).not.toBeUndefined();
      const analyticsData = this.analyticsEvent.data;
      expect(analyticsData.id).toEqual('1');
      expect(analyticsData.name).toEqual('Oakley');
    });

    const displayChurchwideSites = ['Anywhere', 'I do not attend Crossroads'];
    displayChurchwideSites.forEach(siteName => {
      it(`Checks selecting "${siteName}" sets selectedSite to "Churchwide"`, () => {
        this.happenings.selectedSite = "Oakley";

        const fakeEvent = {
          target: {
            value: '000',
            selectedIndex: 0,
            options: [
              { text: siteName }]
          }
        };

        expect(this.happenings.selectedSite).toBe('Oakley');
        expect(this.happenings.user.site).toBe('');

        this.happenings.handleSetSiteInput(fakeEvent);

        expect(this.happenings.selectedSite).toBe('Churchwide');
        expect(this.happenings.user.site).toBe(siteName);
      });
    });

    const badSelectionData = [{
      value: undefined,
      text: undefined
    },
    {
      value: null,
      text: null
    },
    {
      value: '',
      text: ''
    }]
    badSelectionData.forEach(badData => {
      it(`Checks invalid selection data does not change user site`, () => {
        this.happenings.selectedSite = "Oakley";
        this.happenings.user.site = "Mason";

        const fakeEvent = {
          target: {
            value: badData.value,
            selectedIndex: 0,
            options: [
              { text: badData.text }]
          }
        };

        expect(this.happenings.selectedSite).toBe('Oakley');
        expect(this.happenings.user.site).toBe('Mason');

        this.happenings.handleSetSiteInput(fakeEvent);

        expect(this.happenings.selectedSite).toBe('Churchwide');
        expect(this.happenings.user.site).toBe('Mason');

        expect(this.analyticsEvent.name).toBe('HappeningSiteUpdated');
        expect(this.analyticsEvent.data).not.toBeUndefined();
        const analyticsData = this.analyticsEvent.data;
        expect(analyticsData.id).toBe(badData.value);
        expect(analyticsData.name).toEqual('Churchwide');
      });
    });
  });
});

import { SiteHappenings } from '../site-happenings';

describe('<crds-site-happenings> GraphQL I/O', () => {
  beforeEach(() => {
    this.happenings = new SiteHappenings();
    this.lastError = {};

    //Mock error logger method and store values locally
    this.happenings.logError = (err) => {
      this.lastError.error = err;
    };
  });

  describe('Tests fetchMPSitesData()', () => {
    //TODO need a way to get updated auth tokens  - see auth service tests
    it.skip('Checks MP sites are stored', async () => {
      expect(this.happenings.mpSites).toHaveLength(0);

      const authToken = 'REAL AUTH TOKEN';
      await this.happenings.fetchMPSitesData(authToken);

      expect(this.happenings.mpSites.length).toBeGreaterThan(0);
    });

    it('Checks MP sites are not stored if not authenticated', async () => {
      expect(this.happenings.mpSites).toHaveLength(0);
      expect(this.lastError.error).toBeUndefined();

      const fakeAuthToken = '';
      await this.happenings.fetchMPSitesData(fakeAuthToken);

      expect(this.happenings.mpSites).toHaveLength(0);
      expect(this.lastError.error).not.toBeUndefined();
    });
  });

  describe('Tests fetchMPUserData()', () => {
    //TODO need a way to get auth token
    it.skip("Checks that user's site is set", async () => {
      expect(this.happenings.user.site).toBe("");

      const authToken = 'REAL AUTH TOKEN';
      await this.happenings.fetchMPUserData(authToken);

      expect(this.happenings.user.site).not.toBe("");
    });

    it("Checks that user's site is not stored if not authenticated", async () => {
      expect(this.happenings.user.site).toBe("");
      expect(this.lastError.error).toBeUndefined();

      const authToken = '';
      await this.happenings.fetchMPUserData(authToken);

      expect(this.happenings.user.site).toBe("");
      expect(this.lastError.error).not.toBeUndefined();
    });
  });

  describe('Tests fetchContentfulPromoData()', () => {
    it('Checks happenings and Contentful sites are stored', async () => {
      expect(this.happenings.happenings).toHaveLength(0);
      expect(this.happenings.contentfulSites).toHaveLength(0);

      await this.happenings.fetchContentfulPromoData();

      expect(this.happenings.happenings.length).toBeGreaterThan(0);
      expect(this.happenings.contentfulSites.length).toBeGreaterThan(0);
    });
  });

  describe('Tests updateMPUserSite()', () => {
    //TODO need a way to get auth token
    it.skip("Checks that error message is not logged if given valid token and siteId", async () => {
      expect(this.lastError.error).toBeUndefined();

      const authToken = 'REAL AUTH TOKEN';
      const siteId = '1';
      await this.happenings.updateMPUserSite(authToken, siteId);

      expect(this.lastError.error).toBeUndefined();
    });

    it("Checks that error message is logged if not authenticated", async () => {
      expect(this.lastError.error).toBeUndefined();

      const authToken = '';
      const siteId = '1';
      await this.happenings.updateMPUserSite(authToken, siteId);

      expect(this.lastError.error).not.toBeUndefined();
    });

    //TODO need a way to get auth token
    const badSiteIds = ['-1', '1000000000', 'Oakley', null, undefined];
    badSiteIds.forEach(badId => {
      it.skip(`Checks that error message is logged if given invalid siteId ${badId}`, async () => {
        expect(this.lastError.error).toBeUndefined();

        const authToken = 'REAL AUTH TOKEN';
        await this.happenings.updateMPUserSite(authToken, badId);

        expect(this.lastError.error).not.toBeUndefined();
      });
    });
  });
})
import { SiteHappenings } from '../site-happenings';
import { getSessionID, user_with_site } from './test_user_auth';

describe('<crds-site-happenings> GraphQL I/O', () => {
  beforeEach(async () => {
    this.happenings = new SiteHappenings();
    this.lastError = {};

    //Mock error logger method and store values locally
    this.happenings.logError = (err) => {
      this.lastError.error = err;
    };

    this.authToken = await getSessionID(user_with_site.email, user_with_site.password);
  });

  describe('Tests fetchMPSitesData()', () => {
    it('Checks MP sites are stored', async () => {
      expect(this.happenings.mpSites).toHaveLength(0);

      await this.happenings.fetchMPSitesData(this.authToken);

      expect(this.happenings.mpSites.length).toBeGreaterThan(0);
    });

    it.skip('Checks MP sites are not stored if not authenticated', async () => {
      expect(this.happenings.mpSites).toHaveLength(0);
      expect(this.lastError.error).toBeUndefined();

      const fakeAuthToken = '';
      await this.happenings.fetchMPSitesData(fakeAuthToken);

      expect(this.happenings.mpSites).toHaveLength(0);
      expect(this.lastError.error).not.toBeUndefined();
    });
  });

  describe('Tests fetchMPUserData()', () => {
    it("Checks that user's site is set", async () => {
      expect(this.happenings.user.site).toBe("");

      await this.happenings.fetchMPUserData(this.authToken);

      expect(this.happenings.user.site).not.toBe("");
    });

    it.skip("Checks that user's site is not stored if not authenticated", async () => {
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
    it("Checks that error message is not logged if given valid token and siteId", async () => {
      expect(this.lastError.error).toBeUndefined();

      await this.happenings.updateMPUserSite(this.authToken, user_with_site.site_id);

      expect(this.lastError.error).toBeUndefined();
    });

    it.skip("Checks that error message is logged if not authenticated", async () => {
      expect(this.lastError.error).toBeUndefined();

      const authToken = '';
      await this.happenings.updateMPUserSite(authToken, user_with_site.site_id);

      expect(this.lastError.error).not.toBeUndefined();
    });

    const badSiteIds = ['-1', '1000000000', 'Oakley',null, undefined];
    badSiteIds.forEach(badId => {
      it(`Checks that error message is logged if given invalid siteId ${badId}`, async () => {
        expect(this.lastError.error).toBeUndefined();

        await this.happenings.updateMPUserSite(this.authToken, badId);

        expect(this.lastError.error).not.toBeUndefined();
      });
    });
  });
})
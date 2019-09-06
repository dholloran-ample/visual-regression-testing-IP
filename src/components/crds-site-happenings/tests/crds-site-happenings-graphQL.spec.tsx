import { SiteHappenings } from '../site-happenings';
import { getSessionID, user_with_site } from '../../../shared/test_users_auth';
import { CrdsApollo } from '../../../shared/apollo';
import { ContentBlockHandler } from '../../../shared/contentBlocks/contentBlocks';

describe('<crds-site-happenings> GraphQL I/O', () => {
  beforeEach(async () => {
    this.happenings = new SiteHappenings();
    this.lastError = {};

    //Mock error logger method and store values locally
    this.happenings.logError = (err) => {
      this.lastError.error = err;
    };
    this.happenings.authToken = await getSessionID(user_with_site.email, user_with_site.password);
    this.happenings.apolloClient = CrdsApollo(this.happenings.authToken);
    this.happenings.contentBlockHandler = new ContentBlockHandler(null, null);
  });

  describe('Tests getSites()', () => {
    it('Checks MP sites are stored', async () => {
      await this.happenings.getSites();
      expect(this.happenings.sites.length).toBeGreaterThan(0);
    });

    it('Checks MP sites are stored if not authenticated', async () => {
      expect(this.lastError.error).toBeUndefined();

      const fakeAuthToken = '';
      this.happenings.apolloClient = CrdsApollo(fakeAuthToken);
      await this.happenings.getSites();

      expect(this.happenings.sites.length).toBeGreaterThan(0);
    });
  });

  describe('Tests getUser()', () => {
    it("Checks that user's site is set", async () => {
      expect(this.happenings.user).toBe(null);

      await this.happenings.getUser();

      expect(this.happenings.user.site).not.toBe("");
    });

    it("Checks that user's site is not stored if not authenticated", async () => {
      expect(this.happenings.user).toBe(null);
      expect(this.lastError.error).toBeUndefined();

      const authToken = '';
      this.happenings.apolloClient = CrdsApollo(authToken);
      await this.happenings.getUser();

      expect(this.happenings.user).toBe(null);
      expect(this.lastError.error).not.toBeUndefined();
    });
  });

  describe('Tests getPromos()', () => {
    it('Checks happenings and Contentful sites are stored', async () => {
      expect(this.happenings.happenings).toHaveLength(0);
      expect(this.happenings.contentfulSites).toHaveLength(0);

      await this.happenings.getPromos();

      expect(this.happenings.happenings.length).toBeGreaterThan(0);
      expect(this.happenings.contentfulSites.length).toBeGreaterThan(0);
    });
  });

  describe('Tests setUserSite()', () => {
    it("Checks that error message is not logged if given valid token and siteId", async () => {
      expect(this.lastError.error).toBeUndefined();

      await this.happenings.setUserSite(user_with_site.site_id);

      expect(this.lastError.error).toBeUndefined();
    });

    it("Checks that error message is logged if not authenticated", async () => {
      expect(this.lastError.error).toBeUndefined();

      const authToken = '';
      this.happenings.apolloClient = CrdsApollo(authToken);
      await this.happenings.setUserSite(user_with_site.site_id);
      expect(this.lastError.error).not.toBeUndefined();
    });

    const badSiteIds = ['-1', '1000000000', 'Oakley',null, undefined];
    badSiteIds.forEach(badId => {
      it(`Checks that error message is logged if given invalid siteId ${badId}`, async () => {
        expect(this.lastError.error).toBeUndefined();

        await this.happenings.setUserSite(badId);

        expect(this.lastError.error).not.toBeUndefined();
      });
    });
  });
})

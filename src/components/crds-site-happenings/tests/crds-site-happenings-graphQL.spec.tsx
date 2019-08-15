import { SiteHappenings } from '../site-happenings';

describe('<crds-site-happenings> GraphQL I/O', () => {
  beforeEach(() => {
    this.happenings = new SiteHappenings();
    this.lastError = { };

    //Mock error logger method and store values locally
    this.happenings.logError = (err) => {
      this.lastError.error = err;
    };
  });

  describe('Tests fetchMPSitesData()', () => {
    //TODO need a way to get updated auth tokens  - see auth service tests
    it.skip('Checks MP sites are stored', async () => {
      expect(this.happenings.mpSites).toHaveLength(0);

      const authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ijkyc3c1bmhtbjBQS3N0T0k1YS1nVVZlUC1NWSIsImtpZCI6Ijkyc3c1bmhtbjBQS3N0T0k1YS1nVVZlUC1NWSJ9.eyJpc3MiOiJGb3JtcyIsImF1ZCI6IkZvcm1zL3Jlc291cmNlcyIsImV4cCI6MTU2NTg4MTgzMCwibmJmIjoxNTY1ODgwMDMwLCJjbGllbnRfaWQiOiJDUkRTLkNvbW1vbiIsInNjb3BlIjpbImh0dHA6Ly93d3cudGhpbmttaW5pc3RyeS5jb20vZGF0YXBsYXRmb3JtL3Njb3Blcy9hbGwiLCJvZmZsaW5lX2FjY2VzcyIsIm9wZW5pZCJdLCJzdWIiOiIzOTUzNWUzZS03ZTlhLTRjMjktOWNlZS1hMzIwMzA2YzU2M2EiLCJhdXRoX3RpbWUiOjE1NjU4ODAwMzAsImlkcCI6Imlkc3J2IiwibmFtZSI6InNoZW5uZXlAY2FsbGlicml0eS5jb20iLCJhbXIiOlsicGFzc3dvcmQiXX0.bY8dywfTK3v64DUU61Tcbyadhb7335VIAxFWyEbxwxsnX2SsPJkOdf_FfRPoJvv6Dz2uuJOOWXRX6M3CS5felk8-kAZoRFfK6Dc60hl3-THDNptHuMCoypP3l5VbJuAzNlhgEdjdyOChpKRzlRV1fxQmA6EJBecJ47VC9_QENgWLj0mPEUT3_RO78dYgPHvPBNixcQyT5I84Lmsi5oNmo6e0zCLc0kbqUWuUCTYN89C8u0Roud7Wet-GVg3A3gzKw77RQ8LVmq2YbfzZXw_-XBq9ZvXm5Oa2w-Le5qayp2whcHMRkXjN6nC5AJ9JsxCPLzzKaSzG2J_XZYF56XpZbw';
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

      const authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ijkyc3c1bmhtbjBQS3N0T0k1YS1nVVZlUC1NWSIsImtpZCI6Ijkyc3c1bmhtbjBQS3N0T0k1YS1nVVZlUC1NWSJ9.eyJpc3MiOiJGb3JtcyIsImF1ZCI6IkZvcm1zL3Jlc291cmNlcyIsImV4cCI6MTU2NTg4MTgzMCwibmJmIjoxNTY1ODgwMDMwLCJjbGllbnRfaWQiOiJDUkRTLkNvbW1vbiIsInNjb3BlIjpbImh0dHA6Ly93d3cudGhpbmttaW5pc3RyeS5jb20vZGF0YXBsYXRmb3JtL3Njb3Blcy9hbGwiLCJvZmZsaW5lX2FjY2VzcyIsIm9wZW5pZCJdLCJzdWIiOiIzOTUzNWUzZS03ZTlhLTRjMjktOWNlZS1hMzIwMzA2YzU2M2EiLCJhdXRoX3RpbWUiOjE1NjU4ODAwMzAsImlkcCI6Imlkc3J2IiwibmFtZSI6InNoZW5uZXlAY2FsbGlicml0eS5jb20iLCJhbXIiOlsicGFzc3dvcmQiXX0.bY8dywfTK3v64DUU61Tcbyadhb7335VIAxFWyEbxwxsnX2SsPJkOdf_FfRPoJvv6Dz2uuJOOWXRX6M3CS5felk8-kAZoRFfK6Dc60hl3-THDNptHuMCoypP3l5VbJuAzNlhgEdjdyOChpKRzlRV1fxQmA6EJBecJ47VC9_QENgWLj0mPEUT3_RO78dYgPHvPBNixcQyT5I84Lmsi5oNmo6e0zCLc0kbqUWuUCTYN89C8u0Roud7Wet-GVg3A3gzKw77RQ8LVmq2YbfzZXw_-XBq9ZvXm5Oa2w-Le5qayp2whcHMRkXjN6nC5AJ9JsxCPLzzKaSzG2J_XZYF56XpZbw';
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
    //NOTE this query is dependent on contentful environment variables being set correctly
    //NOTE this assumes at least one with audience exists
    it('Checks happenings and Contentful sites are stored', async () => {
      expect(this.happenings.happenings).toHaveLength(0);
      expect(this.happenings.contentfulSites).toHaveLength(0);

      await this.happenings.fetchContentfulPromoData();

      expect(this.happenings.happenings.length).toBeGreaterThan(0);
      expect(this.happenings.contentfulSites.length).toBeGreaterThan(0);
    });
  });

  describe('Tests updateMPUserSite()', () => {
    it.skip("Checks that error message is not logged if given valid token and siteId", async () => {
      expect(this.lastError.error).toBeUndefined();

      const authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ijkyc3c1bmhtbjBQS3N0T0k1YS1nVVZlUC1NWSIsImtpZCI6Ijkyc3c1bmhtbjBQS3N0T0k1YS1nVVZlUC1NWSJ9.eyJpc3MiOiJGb3JtcyIsImF1ZCI6IkZvcm1zL3Jlc291cmNlcyIsImV4cCI6MTU2NTkwNTQyMSwibmJmIjoxNTY1OTAzNjIxLCJjbGllbnRfaWQiOiJDUkRTLkNvbW1vbiIsInNjb3BlIjpbIm9wZW5pZCIsIm9mZmxpbmVfYWNjZXNzIiwiaHR0cDovL3d3dy50aGlua21pbmlzdHJ5LmNvbS9kYXRhcGxhdGZvcm0vc2NvcGVzL2FsbCJdLCJzdWIiOiJkMjVjYjY3Ny1kNTI2LTQ5MjYtYmE5Zi02YWZiNjY0MjhhZGUiLCJhdXRoX3RpbWUiOjE1NjU4ODA2MDYsImlkcCI6Imlkc3J2IiwibmFtZSI6ImNvbGVjYXRAZ21haWwuY29tIiwiYW1yIjpbInBhc3N3b3JkIl19.rN2GKq9i23gD-Pvfsf7h0itDePuty5awVG-rMY6Va89W1tGpNdXoQF1dJm87WsCGvN3JC_BmB4alEmREMVYTBWZv5L0sC5FE0gJeLC_aN6unHLDSKpWWpMXtnzUJsMR8t-mZ3s5E-qTZ5rvQ6L9dJ5_plGbFNqVSs0NG_7XYgFjJKuqvZVEwzEbcU-EpPxitg70ddqK0FAnKQs27euOeO1GoNhGc0GACNbHzoFvFpAd-5krvGDfd86bqltpqzEpkEpqMLo1VwZDUPZwRGc-uHmC1_1lQml5Fagj6i5yLCfCMp7m_3IpPWMVHNcRV8OS3eYC0Kb_xfBF68sggCbM9tw';
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
      it(`Checks that error message is logged if given invalid siteId ${badId}`, async () => {
        expect(this.lastError.error).toBeUndefined();

        const authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ijkyc3c1bmhtbjBQS3N0T0k1YS1nVVZlUC1NWSIsImtpZCI6Ijkyc3c1bmhtbjBQS3N0T0k1YS1nVVZlUC1NWSJ9.eyJpc3MiOiJGb3JtcyIsImF1ZCI6IkZvcm1zL3Jlc291cmNlcyIsImV4cCI6MTU2NTkwNTQyMSwibmJmIjoxNTY1OTAzNjIxLCJjbGllbnRfaWQiOiJDUkRTLkNvbW1vbiIsInNjb3BlIjpbIm9wZW5pZCIsIm9mZmxpbmVfYWNjZXNzIiwiaHR0cDovL3d3dy50aGlua21pbmlzdHJ5LmNvbS9kYXRhcGxhdGZvcm0vc2NvcGVzL2FsbCJdLCJzdWIiOiJkMjVjYjY3Ny1kNTI2LTQ5MjYtYmE5Zi02YWZiNjY0MjhhZGUiLCJhdXRoX3RpbWUiOjE1NjU4ODA2MDYsImlkcCI6Imlkc3J2IiwibmFtZSI6ImNvbGVjYXRAZ21haWwuY29tIiwiYW1yIjpbInBhc3N3b3JkIl19.rN2GKq9i23gD-Pvfsf7h0itDePuty5awVG-rMY6Va89W1tGpNdXoQF1dJm87WsCGvN3JC_BmB4alEmREMVYTBWZv5L0sC5FE0gJeLC_aN6unHLDSKpWWpMXtnzUJsMR8t-mZ3s5E-qTZ5rvQ6L9dJ5_plGbFNqVSs0NG_7XYgFjJKuqvZVEwzEbcU-EpPxitg70ddqK0FAnKQs27euOeO1GoNhGc0GACNbHzoFvFpAd-5krvGDfd86bqltpqzEpkEpqMLo1VwZDUPZwRGc-uHmC1_1lQml5Fagj6i5yLCfCMp7m_3IpPWMVHNcRV8OS3eYC0Kb_xfBF68sggCbM9tw';
        await this.happenings.updateMPUserSite(authToken, badId);

        expect(this.lastError.error).not.toBeUndefined();
      });
    });
  });
})
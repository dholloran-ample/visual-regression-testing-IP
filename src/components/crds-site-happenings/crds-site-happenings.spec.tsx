import { SiteHappenings } from './site-happenings';

describe('<crds-site-happenings>', () => {
  beforeEach(() => {
    this.happenings = new SiteHappenings();
  });

  it('should default to Churchwide for logged out users', () => {
    expect(this.happenings.selectedSite).toEqual('Churchwide');
  });

  describe('Tests defaultToUserSite()', () => {
    it('should display Churchwide if user missing site', () => {
      const flaggedSites = ['Not site specific', 'I do not attend Crossroads', 'Anywhere', null, undefined]
      flaggedSites.forEach(site => {
        this.happenings.defaultToUserSite(site);
        expect(this.happenings.selectedSite).toEqual('Churchwide');
      });
    });

    it('should default to user site', () => {
      const userSites = ['Oakley', 'Downtown Lexington', 'Fake Site', ['Array Site'], {name: 'Object Site'}]
      userSites.forEach(site => {
        this.happenings.defaultToUserSite(site);
        expect(this.happenings.selectedSite).toEqual(site);
      });
    });
  });


  //These use defaultToUserSite:
  //fetchUserData, handleSetDefaultSite
  //change filter - check happenings list lists promos?


});
import { SiteHappenings } from './site-happenings';

describe('<crds-site-happenings>', () => {
  beforeEach(() => {
    this.happenings = new SiteHappenings();
  });

  it('should default to Churchwide for logged out users', () => {
    expect(this.happenings.selectedSite).toEqual('Churchwide');
  });
});

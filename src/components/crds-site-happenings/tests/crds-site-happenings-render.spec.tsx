import { SiteHappenings } from '../site-happenings';

describe('<crds-site-happenings>', () => {
  beforeEach(() => {
    this.happenings = new SiteHappenings();
    // this.lastAnalytics = { };

    // //Mock analytics call method and store values locally
    // this.happenings.analytics.track = (name, data) => {
    //   this.lastAnalytics.name = name;
    //   this.lastAnalytics.data = data
    // };
  });


  describe('Tests maybeRenderSetSiteModal()', () => {
    it('Checks setSiteModal not returned if not authenticated', () => {
      const modal = this.happenings.maybeRenderSetSiteModal();
      expect(modal).toBe('');
    });

    it('Checks setSiteModal not returned for authenticated user with site is already selected', () => {
      this.happenings.authToken = '123'; //Value doesn't matter here
      this.happenings.user.site = 'Oakley';

      const modal = this.happenings.maybeRenderSetSiteModal();
      expect(modal).toBe('');
    });

    const userSiteNotSelected = ['Not site specific', null, '']
    userSiteNotSelected.forEach(site => {
      it(`Checks setSiteModal returned for authenticated user with unselected site, value "${site}"`, () => {
        this.happenings.authToken = '123'; //Value doesn't matter here
        this.happenings.user.site = site;

        const modal = this.happenings.maybeRenderSetSiteModal();
        expect(modal).not.toBe('');
      });
    });
  });

  describe('Tests renderHappenings()', () => {
    it('Checks skeleton is returned if there are no happenings', () => {
      const render = this.happenings.renderHappenings();

      expect(render).toHaveLength(4);
      render.forEach(element => {
        expect(element['$attrs$'].class).toEqual('card-skeleton');
      });
    });

    it('Checks card carousel is returned if there are happenings', () => {
      this.happenings.selectedSite = 'Oakley';
      this.happenings.happenings = [{
        targetAudience: ['Oakley', 'Mason'],
        linkUrl: '123',
        title: 'Oakley happening',
        image: { url: 'int.crossroads.net'},
        description: 'Test promo'
      },
      {
        targetAudience: ['Florence','Oakley'],
        linkUrl: '1234',
        title: 'Oakley happening2',
        image: { url: 'int.crossroads.net/images'},
        description: 'Test promo2'
      }]

      const render = this.happenings.renderHappenings();

      expect(render).toHaveLength(this.happenings.happenings.length);
      render.forEach(element => {
        expect(element['$attrs$'].class).toEqual('card carousel-cell');
      });
    });

    it('Checks card carousel contains only happenings for selected site', () => {
      this.happenings.selectedSite = 'Oakley';
      this.happenings.happenings = [{
        targetAudience: ['Oakley'],
        linkUrl: '123',
        title: 'Oakley happening',
        image: { url: 'int.crossroads.net'},
        description: 'Test promo'
      },
      {
        targetAudience: ['Mason'],
        linkUrl: '1234',
        title: 'Oakley happening2',
        image: { url: 'int.crossroads.net/images'},
        description: 'Test promo2'
      }]


      const render = this.happenings.renderHappenings();

      expect(render).toHaveLength(1);
      render.forEach(element => {
        expect(element['$attrs$'].class).toEqual('card carousel-cell');
      });
    });
  });
});
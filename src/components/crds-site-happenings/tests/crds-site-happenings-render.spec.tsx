import { SiteHappenings } from '../site-happenings';
import { CrdsApollo } from '../../../shared/apollo';
import { getSessionID, user_with_site } from '../../../shared/test_users_auth';

describe('<crds-site-happenings> Render', () => {
  beforeEach(async () => {
    this.happenings = new SiteHappenings();
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

    const userSiteNotSelected = ['Not site specific', null, ''];
    userSiteNotSelected.forEach(site => {
      it(`Checks setSiteModal returned for authenticated user with unselected site, value "${site}"`, () => {
        this.happenings.authToken = '123'; //Value doesn't matter here
        this.happenings.user.site = site;

        const render = this.happenings.maybeRenderSetSiteModal();

        expect(render).not.toBe('');
        expect(render['$attrs$'].class).toEqual('site-select-message');
      });
    });
  });

  describe('Tests renderHappenings()', () => {
    it('Checks card carousel is returned if there are happenings', () => {
      this.happenings.selectedSite = 'Oakley';
      this.happenings.happenings = [
        {
          targetAudience: ['Oakley', 'Mason'],
          qualifiedUrl: '123',
          title: 'Oakley happening',
          imageUrl: 'int.crossroads.net',
          description: 'Test promo'
        },
        {
          targetAudience: ['Florence', 'Oakley'],
          qualifiedUrl: '1234',
          title: 'Oakley happening2',
          imageUrl: 'int.crossroads.net/images',
          description: 'Test promo2'
        }
      ];

      const render = this.happenings.renderHappenings();

      expect(render).toHaveLength(this.happenings.happenings.length);
      render.forEach(element => {
        expect(element['$attrs$'].class).toEqual('card carousel-cell');
      });
    });

    it('Checks card carousel contains only happenings for selected site', () => {
      this.happenings.selectedSite = 'Oakley';
      this.happenings.happenings = [
        {
          targetAudience: ['Oakley'],
          qualifiedUrl: '123',
          title: 'Oakley happening',
          imageUrl: 'int.crossroads.net',
          description: 'Test promo'
        },
        {
          targetAudience: ['Mason'],
          qualifiedUrl: '1234',
          title: 'Oakley happening2',
          imageUrl: 'int.crossroads.net/images',
          description: 'Test promo2'
        }
      ];

      const render = this.happenings.renderHappenings();

      expect(render).toHaveLength(1);
      render.forEach(element => {
        expect(element['$attrs$'].class).toEqual('card carousel-cell');
      });
    });
  });
});

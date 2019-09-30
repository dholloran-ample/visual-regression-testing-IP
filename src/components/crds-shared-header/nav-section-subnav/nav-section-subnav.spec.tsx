import { NavSectionSubnav } from "./nav-section-subnav";

describe('<nav-section-subnav>', () => {
  beforeEach(() => {
    this.component = new NavSectionSubnav();
  });

  describe('Tests render()', () => {
    it('Checks element class not hidden if active element', () => {
      this.component.subNavName = 'subnav-come-visit';
      this.component.isActive = true;

      const rendered = this.component.render();

      expect(rendered.$attrs$.class).not.toMatch(/.*hidden.*/);
    });

    it('Checks element class hidden if not active element', () => {
      this.component.subNavName = 'subnav-come-visit';
      this.component.isActive = false;

      const rendered = this.component.render();

      expect(rendered.$attrs$.class).toMatch(/.*hidden.*/);
    });

    it('Checks element returned has data-automation-id', () => {
      this.component.subNavName = 'come-visit';

      const rendered = this.component.render();

      expect(rendered.$children$[0].$attrs$['data-automation-id']).toBe('sh-section-subnav-come-visit');
    });

    it('Checks element returned has back link', () => {
      const rendered = this.component.render();

      expect(rendered.$children$[0].$attrs$.class).toBe('back');
      expect(rendered.$children$[0].$children$[0].$attrs$.innerHTML).toMatch(/<svg.*/);
    });

    it('Checks element returned has title', () => {
      this.component.data.title = 'some title';

      const rendered = this.component.render();

      expect(rendered.$children$[1].$tag$).toBe('h2');
      expect(rendered.$children$[1].$children$[0].$text$).toBe('some title');
    });

    it('Checks element returned has onClick', () => {
      const rendered = this.component.render();

      expect(typeof rendered.$children$[0].$attrs$.onClick).toBe('function');
    });

    it('Checks element onClick event bound to expected method', () => {
      this.component.handleBackClick = jest.fn();

      const rendered = this.component.render();

      rendered.$children$[0].$attrs$.onClick();

      expect(this.component.handleBackClick).toBeCalledTimes(1);
    });
  });
});
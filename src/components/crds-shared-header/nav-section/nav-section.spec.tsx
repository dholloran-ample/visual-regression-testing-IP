import { NavigationSection } from "./nav-section";
import { Config } from "../../../shared/config";
import { Logger } from "../../../shared/logger";

describe('<nav-section>', () => {
  beforeEach(() => {
    this.component = new NavigationSection();
  });

  describe('Tests render()', () => {
    it('Checks element returned has data-automation-id', () => {
      this.component.slug = 'watch-listen-read';

      const rendered = this.component.render();
      const renderedEntry = rendered['$children$'][0]

      expect(renderedEntry['$attrs$']['data-automation-id']).toBe('sh-section-watch-listen-read');
    });

    it('Checks element returned has correct class if active', () => {
      this.component.isActive = true;

      const rendered = this.component.render();
      const renderedEntry = rendered['$children$'][0]

      expect(renderedEntry['$attrs$'].class).toBe('is-active');
    });

    it('Checks element returned has correct class if not active', () => {
      this.component.isActive = false;

      const rendered = this.component.render();
      const renderedEntry = rendered['$children$'][0]

      expect(renderedEntry['$attrs$'].class).toBe('');
    });

    it('Checks element returned has onClick', () => {
      const rendered = this.component.render();
      const renderedEntry = rendered['$children$'][0]

      expect(typeof renderedEntry['$attrs$'].onClick).toBe('function');
    });

    it('Checks element onClick event can be bound to function', () => {
      this.component.onActivate = jest.fn();

      const rendered = this.component.render();
      const renderedEntry = rendered['$children$'][0]
      renderedEntry['$attrs$'].onClick();

      expect(this.component.onActivate).toBeCalledTimes(1);
    });
  });

  describe('Tests componentWillLoad()', () => {
    it('Checks console is defined', () => {
      expect(this.component.config).toBeUndefined();

      this.component.componentWillLoad();

      expect(this.component.config).not.toBeUndefined();
      expect(this.component.config).toBeInstanceOf(Config);
    });

    it('Checks console is defined', () => {
      expect(this.component.console).toBeUndefined();

      this.component.componentWillLoad();

      expect(this.component.console).not.toBeUndefined();
      expect(this.component.console).toBeInstanceOf(Logger);
    });
  });
});
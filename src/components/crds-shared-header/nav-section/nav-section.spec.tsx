import { NavigationSection } from "./nav-section";
import { Config } from "../../../shared/config";
import { Logger } from "../../../shared/logger";

describe('<nav-section>', () => {
  beforeEach(() => {
    this.component = new NavigationSection();
  });

  describe('Tests render()', () => {
    beforeEach(() => {
      this.component.handleClick = jest.fn();
    });

    it('Checks element returned has data-automation-id', () => {
      this.component.sectionName = 'watch-listen-read';

      const rendered = this.component.render();
      const renderedElement = rendered.$children$[0]

      expect(renderedElement.$attrs$['data-automation-id']).toBe('sh-section-watch-listen-read');
    });

    it('Checks element returned has correct class if active', () => {
      this.component.isActive = true;

      const rendered = this.component.render();
      const renderedElement = rendered.$children$[0]

      expect(renderedElement.$attrs$.class).toBe('is-active');
    });

    it('Checks element returned has correct class if not active', () => {
      this.component.isActive = false;

      const rendered = this.component.render();
      const renderedElement = rendered.$children$[0]

      expect(renderedElement.$attrs$.class).toBe('');
    });

    it('Checks element returned has onClick', () => {
      const rendered = this.component.render();
      const renderedElement = rendered.$children$[0]

      expect(typeof renderedElement.$attrs$.onClick).toBe('function');
    });

    // it('Checks element onClick event can be bound to function', () => {
    //   // this.component.handleClick = jest.fn();

    //   const rendered = this.component.render();
    //   // const renderedElement = rendered.$children$[0]
    //   // renderedElement.$attrs$.onClick();

    //   // expect(this.component.handleClick).toBeCalledTimes(1);

    //   expect(typeof rendered.$children$[0].$attrs$.onClick).toBe('function');
    // });
  });

  describe('Tests onClick()', () => {
    it('Checks handleClick function is called on click', () => {
      const fakeEvent = {
        preventDefault: jest.fn()
      }
      this.component.handleClick = jest.fn();

      this.component.onClick(fakeEvent);

      expect(this.component.handleClick).toBeCalledTimes(1);
    });

    it('Checks error is thrown if handleClick is not set', () => {
//TODO
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
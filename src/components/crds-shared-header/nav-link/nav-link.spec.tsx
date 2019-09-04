import { NavigationLink } from "./nav-link";
import { Config } from "../../../shared/config";
import { Logger } from "../../../shared/logger";

describe('<nav-link>', () => {
  beforeEach(() => {
    this.component = new NavigationLink();
  });

  describe('Tests onClick()', () => {
    beforeEach(() => {
      this.fakeEvent = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn()
      }
    });

    it('Checks click handled with custom function if given', () => {
      this.component.handleOnClick = jest.fn();

      this.component.onClick(this.fakeEvent);

      expect(this.component.handleOnClick).toBeCalledTimes(1);
      expect(this.fakeEvent.stopPropagation).toBeCalledTimes(1);
      expect(this.fakeEvent.preventDefault).toBeCalledTimes(1);
    });

    it('Checks click handled by default if no custom function is given', () => {
      this.component.handleOnClick = false;

      this.component.onClick(this.fakeEvent);

      expect(this.fakeEvent.stopPropagation).toBeCalledTimes(1);
      expect(this.fakeEvent.preventDefault).not.toBeCalled();
    });
  });

  describe('Tests render()', () => {
    it('Checks element returned has href', () => {
      this.component.href = 'https://int.crossroads.net/prayer';

      const rendered = this.component.render();

      expect(rendered.$attrs$.href).toBe('https://int.crossroads.net/prayer');
    });

    it('Checks element returned has data-automation-id', () => {
      this.component.automationId = 'sh-signin';

      const rendered = this.component.render();

      expect(rendered.$attrs$['data-automation-id']).toBe('sh-signin');
    });

    it('Checks element returned has onClick', () => {
      const rendered = this.component.render();

      expect(typeof rendered.$attrs$.onClick).toBe('function');
    });

    it('Checks href set to # if not set', () => {
      const rendered = this.component.render();

      expect(rendered.$attrs$.href).toBe('#');
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
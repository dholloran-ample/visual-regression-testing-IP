import { NavigationLink } from "./nav-link";
import { Config } from "../../../shared/config";
import { Logger } from "../../../shared/logger";

describe('<nav-link>', () => {
  beforeEach(() => {
    this.component = new NavigationLink();
  });

  describe('Tests onClick()', () => {
    beforeEach(() => {
      this.component.signOutClicked.emit = jest.fn();
    });

    //TODO why is int/prod diff from demo when signing out? Will either work?

    it('Checks sign out event emitted if this matches the sign-out link', () => {
      const windowsLocation = window.location.href;

      this.component.automationId = 'sh-sign-out';

      this.component.onClick();

      expect(this.component.signOutClicked.emit).toBeCalledTimes(1);
      expect(window.location.href).toBe(windowsLocation);
    });

    it('Checks window.location is set to current nav href if not sign-out link', () => {
      expect(window.location.href).not.toBe('https://int.crossroads.net/prayer');

      this.component.href = 'https://int.crossroads.net/prayer';
      this.component.onClick();

      expect(window.location.href).toBe('https://int.crossroads.net/prayer');
      expect(this.component.signOutClicked.emit).not.toBeCalled();
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

    it('Checks element onClick event bound to expected method', () => {
      expect(window.location.href).not.toBe('https://int.crossroads.net/prayer');

      this.component.href = 'https://int.crossroads.net/prayer';

      const rendered = this.component.render();
      rendered.$attrs$.onClick();

      expect(window.location.href).toBe('https://int.crossroads.net/prayer')
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
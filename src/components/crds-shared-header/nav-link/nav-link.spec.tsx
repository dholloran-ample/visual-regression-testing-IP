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
    //TODO why is int/prod diff from demo when signing out? Will either work?

    it('Checks handleSignOut to be called if is sign-out link and handleSignOut function defined', () => {
      const ogWindowsLocation = window.location.href;

      this.component.automationId = 'sh-sign-out';
      this.component.handleSignOut = jest.fn();

      this.component.onClick(this.fakeEvent);

      expect(this.component.handleSignOut).toBeCalledTimes(1);
      expect(window.location.href).toBe(ogWindowsLocation);
    });

    it('Checks windows.location is not changed if is sign-out link but has no handleSignOut function', () => {
      const ogWindowsLocation = window.location.href;

      this.component.automationId = 'sh-sign-out';
      this.component.handleSignOut = undefined;

      this.component.onClick(this.fakeEvent);

      expect(window.location.href).toBe(ogWindowsLocation);
    });

    it('Checks window.location is set to current nav href if not sign-out link', () => {
      expect(window.location.href).not.toBe('https://int.crossroads.net/prayer');

      this.component.automationId = 'sh-prayer';
      this.component.href = 'https://int.crossroads.net/prayer';
      this.component.handleSignOut = jest.fn();
      this.component.onClick(this.fakeEvent);

      expect(window.location.href).toBe('https://int.crossroads.net/prayer');
      expect(this.component.handleSignOut).not.toBeCalled();
    });
  });

  describe('Tests isSignOutLink()', () => {
    it('Checks true is returned if automation id matches known signout id', () => {
      this.component.automationId = 'sh-sign-out';

      const isSignOut = this.component.isSignOutLink();

      expect(isSignOut).toBe(true);
    });

    it('Checks false is returned if automation id is not known signout id', () => {
      this.component.automationId = 'other-sign-out';

      const isSignOut = this.component.isSignOutLink();

      expect(isSignOut).toBe(false);
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
      rendered.$attrs$.onClick(this.fakeEvent);

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
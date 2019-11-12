jest.mock('../../../shared/auth');
import { GlobalNav } from './global-nav';

describe('<global-nav>', () => {
  beforeEach(() => {
    this.component = new GlobalNav();
    this.component.env = 'int';

    this.fakeEvent = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    }
  });

  it('should redirect users following sign out', () => {
    this.component.auth = {
      signOut: jest.fn()
    };
    const redirectToRoot = (this.component.redirectToRoot = jest.fn());
    this.component.authChangeCallback();
    expect(redirectToRoot).toBeCalled();
  });

  describe('Tests componentWillLoad()', () => {
    it('Checks auth is not initialized if config is undefined', () => {
      expect(this.component.auth).toEqual({});
      expect(this.component.data.config).toBeUndefined();

      this.component.componentWillLoad();

      expect(this.component.auth).toEqual({});
    });

    it('Checks auth is not initialized again if auth.config is defined', () => {
      this.component.auth = { config: 'fake config' }
      expect(this.component.data.config).toBeUndefined();

      this.component.componentWillLoad();

      expect(this.component.auth).toEqual({ config: 'fake config' } );
    });

    it('Checks auth is initialized', () => {
      this.component.data.config = {};
      expect(this.component.auth).toEqual({})

      this.component.componentWillLoad();

      expect(this.component.auth).not.toEqual({})
    });
  });

  describe('Tests componentDidLoad()', () => {
    it('Checks element must be defined', () => {
      expect(this.component.element).toBeUndefined();
      expect(() => this.component.componentDidLoad()).toThrow();
    });

    it('Checks offset is set', () => {
      this.component.element = { getBoundingClientRect(){return {top: 1}}};

      expect(this.component.topOffset).toBeUndefined();

      this.component.componentDidLoad();

      expect(this.component.topOffset).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Tests authChangeCallback()', () => {
    it('Checks redirectToRoot called if auth undefined', () => {
      this.component.redirectToRoot = jest.fn();
      expect(this.component.auth).toEqual({});

      this.component.authChangeCallback();

      expect(this.component.redirectToRoot).toBeCalled();
    });

    it('Checks redirectToRoot not called if not authenticated', () => {
      this.component.redirectToRoot = jest.fn();
      this.component.auth = { authenticated: false };

      this.component.authChangeCallback();

      expect(this.component.redirectToRoot).toBeCalled();
    });

    it('Checks redirectToRoot not called if authenticated', () => {
      this.component.redirectToRoot = jest.fn();
      this.component.auth = { authenticated: true };

      this.component.authChangeCallback();

      expect(this.component.redirectToRoot).not.toBeCalled();
    });
  });

  describe('Tests handleSignOut()', () => {
    it('Checks auth.signOut is called', () => {
      this.component.auth = { signOut: jest.fn() }

      this.component.handleSignOut();

      expect(this.component.auth.signOut).toBeCalled();
    });
  });

  describe('Tests redirectToRoot()', () => {
    it('Checks window.location is set to rootUrl', async () => {
      window.location.replace = jest.fn();

      await this.component.redirectToRoot();

      expect(window.location.replace).toBeCalled();
    });
  });

  describe('Tests toggleNav()', () => {
    it('Checks open menu is toggled closed', () => {
      this.component.openNavName = 'give-nav';

      this.component.toggleNav(this.fakeEvent, 'give-nav');

      expect(this.component.openNavName).toBe('');
      expect(this.fakeEvent.preventDefault).toBeCalledTimes(1);
    });

    it('Checks new menu is toggled', () => {
      this.component.openNavName = 'give-nav';

      this.component.toggleNav(this.fakeEvent, 'main-nav');

      expect(this.component.openNavName).toBe('main-nav');
      expect(this.fakeEvent.preventDefault).toBeCalledTimes(1);
    });

    it('Checks closed menu is toggled open', () => {
      this.component.openNavName = '';

      this.component.toggleNav(this.fakeEvent, 'give-nav');

      expect(this.component.openNavName).toBe('give-nav');
      expect(this.fakeEvent.preventDefault).toBeCalledTimes(1);
    });

    it('Checks menu requiring auth is not opened if not authenticated', () => {
      this.component.openNavName = 'give-nav';

      this.component.toggleNav(this.fakeEvent, 'profile-nav', true);

      expect(this.component.openNavName).toBe('give-nav');
      expect(this.fakeEvent.preventDefault).not.toBeCalled();
    });

    it('Checks menu requiring auth is opened if authenticated', () => {
      this.component.isAuthenticated = true;
      this.component.openNavName = 'give-nav';

      this.component.toggleNav(this.fakeEvent, 'profile-nav', true);

      expect(this.component.openNavName).toBe('profile-nav');
      expect(this.fakeEvent.preventDefault).toBeCalledTimes(1);
    });

    it('Checks expected doc style is set when nav toggled open', () => {
      this.component.openNavName = '';

      this.component.toggleNav(this.fakeEvent, 'main-nav');

      expect(document.body.style.overflow).toBe('scroll');
      expect(document.body.style.position).toBe('absolute');
      expect(document.body.style.width).toBe('100vw');
    });

    it('Checks expected doc style is set when nav changes', () => {
      this.component.openNavName = 'give-nav';

      this.component.toggleNav(this.fakeEvent, 'main-nav');

      expect(this.component.openNavName).toBe('main-nav');

      expect(document.body.style.overflow).toBe('scroll');
      expect(document.body.style.position).toBe('absolute');
      expect(document.body.style.width).toBe('100vw');
    });

    it('Checks expected doc style is set when nav toggled closed', () => {
      this.component.openNavName = 'main-nav';

      this.component.toggleNav(this.fakeEvent, 'main-nav');

      expect(document.body.style.overflow).toBe('scroll');
      expect(document.body.style.position).toBe('');
      expect(document.body.style.width).toBe('');
    });

    it('Checks expected doc style is set when unknown nav toggled "open"', () => {
      this.component.openNavName = 'main-nav';

      this.component.toggleNav(this.fakeEvent, 'super-fake-nav');

      expect(this.component.openNavName).toBe('super-fake-nav');

      expect(document.body.style.overflow).toBe('scroll');
      expect(document.body.style.position).toBe('');
      expect(document.body.style.width).toBe('');
    });
  });

  describe('Tests rootURL()', () => {
    it('should return root URL', () => {
      expect(this.component.rootURL()).toBe('https://int.crossroads.net');
    });
  });

  describe('Tests closeNav()', () => {
    it('Checks navs not showing', () => {
      this.component.openNavName = 'give-nav';

      this.component.closeNav(this.fakeEvent);

      expect(this.component.openNavName).toBe('');

      expect(document.body.style.overflow).toBe('scroll');
      expect(document.body.style.position).toBe('');
      expect(document.body.style.width).toBe('');
    });
  });

  describe('Tests render()', () => {
    beforeEach(() => {
      this.component.data = {give: {}, profile: {}};
    });

    it('Checks element returned has main-nav', () => {
      const rendered = this.component.render();

      expect(rendered[1].$tag$).toBe('main-nav');
    });

    it('Checks element has no give-nav if children not defined', () => {
      expect(this.component.data.children).toBeUndefined
      const rendered = this.component.render();
      expect(rendered[0].$children$[0].$children$[1].$tag$).not.toBe('give-nav');
    })

    it('Checks element returned has give-nav', () => {
      this.component.data.give = { children: [] }
      const rendered = this.component.render();

      expect(rendered[0].$children$[0].$children$[1].$tag$).toBe('give-nav');
    });

    it('Checks element returned has profile-nav', () => {
      const rendered = this.component.render();

      expect(rendered[0].$children$[0].$children$[1].$tag$).toBe('profile-nav');
    });

    it('Checks header class if any nav is open', () => {
      this.component.openNavName = 'profile-nav';

      const rendered = this.component.render();

      expect(rendered[0].$attrs$.class).toBe('nav-is-showing');
    });

    it('Checks header class if all navs are closed', () => {
      this.component.openNavName = '';

      const rendered = this.component.render();

      expect(rendered[0].$attrs$.class).toBe('');
    });

    it('Checks header class if unknown nav is "open"', () => {
      this.component.openNavName = 'super-fake-nav';

      const rendered = this.component.render();

      expect(rendered[0].$attrs$.class).toBe('');
    });

    ['give-nav', 'profile-nav'].forEach(styledNavs => {
      it(`Checks header style if ${styledNavs} is opened`, () => {
        this.component.topOffset = 15;
        this.component.openNavName = styledNavs;

        const rendered = this.component.render();

        expect(rendered[0].$attrs$.style.top).toBe('15px');
      });
    });

    it(`Checks header style if main-nav is opened`, () => {
      this.component.topOffset = 15;
      this.component.openNavName = 'main-nav';

      const rendered = this.component.render();

      expect(rendered[0].$attrs$.style.top).toBe('0px');
    });
  });

  describe('Tests authProfileIcon()', () => {
    const matchUrl = /url\('(.*)'\);/;

    it('Checks avatarUrl is included in returend string', () => {
      this.component.auth = { currentUser: { avatarUrl: 'https://fakeAvatar.com'} };

      const newString = this.component.authProfileIcon();

      expect(matchUrl.exec(newString)[1]).toBe('https://fakeAvatar.com');
    });

    it('Checks url is empty string if auth.currentUser is undefined', () => {
      this.component.auth = { };

      const newString = this.component.authProfileIcon();

      expect(matchUrl.exec(newString)[1]).toBe('');
    });

    it('Checks url is empty string if auth.currentUser.avatarUrl is undefined', () => {
      this.component.auth = { currentUser: {} };

      const newString = this.component.authProfileIcon();

      expect(matchUrl.exec(newString)[1]).toBe('');
    });
  });
});

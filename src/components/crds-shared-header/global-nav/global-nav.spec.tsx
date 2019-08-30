jest.mock('../../../shared/auth');
import { GlobalNav } from './global-nav';
//TODO update tests with new toggle system - also include test for fake nav names
describe('<global-nav>', () => {
  beforeEach(() => {
    this.component = new GlobalNav();
    this.component.env = 'int';
  });

  it('should redirect users following signout', () => {
    this.component.auth = {
      signOut: jest.fn()
    };
    const redirectToRoot = (this.component.redirectToRoot = jest.fn());
    this.component.authChangeCallback();
    expect(redirectToRoot).toBeCalled();
  });

  describe('Tests initAuth()', () => {
    it('Checks auth is not initialized if config is undefined', () => {
      expect(this.component.auth).toEqual({});
      expect(this.component.config).toBeUndefined();

      this.component.initAuth();

      expect(this.component.auth).toEqual({});
    });

    it('Checks auth is not initialized again if auth.config is defined', () => {
      this.component.auth = { config: 'fake config' }
      expect(this.component.config).toBeUndefined();

      this.component.initAuth();

      expect(this.component.auth).toEqual({ config: 'fake config' } );
    });

    it('Checks auth is initialized', () => {
      this.component.config = {};
      expect(this.component.auth).toEqual({})

      this.component.initAuth();

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

      expect(this.component.offset).toBeUndefined();

      this.component.componentDidLoad();

      expect(this.component.offset).toBeGreaterThanOrEqual(0);
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

  describe('Tests handleProfileClick()', () => {
    it('Checks event stopped if not authenticated', () => {
      const fakeEvent = {
        stopPropagation: jest.fn()};

      this.component.handleProfileClick(fakeEvent);

      expect(fakeEvent.stopPropagation).toBeCalled();
    });

    it('Checks toggleMenu to be called if authenticated', () => {
      const fakeEvent = {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn()};

      this.component.toggleMenu = jest.fn();
      this.component.auth = {authenticated: true}

      this.component.handleProfileClick(fakeEvent);

      expect(this.component.toggleMenu).toBeCalled();
    });
  });

  describe('Tests menuClasses()', () => {
    it('Checks nav showing indicator added to class list if nav showing', () => {
      this.component.mainNavIsShowing = true;

      const newClass = this.component.menuClasses();

      expect(newClass).toBe('menu-container nav-is-showing')
    });

    it('Checks nav showing indicator not added to class list if nav not showing', () => {
      expect(this.component.mainNavIsShowing).toBeFalsy();

      const newClass = this.component.menuClasses();

      expect(newClass).toBe('menu-container')
    });
  });

  describe('Tests profileClasses()', () => {
    it('Checks nav showing indicator added to class list if nav showing and authenticated', () => {
      this.component.profileNavIsShowing = true;
      this.component.isAuthenticated = true;

      const newClass = this.component.profileClasses();

      expect(newClass).toBe('profile-container nav-is-showing')
    });

    it('Checks nav showing indicator not added to class list if nav not showing', () => {
      expect(this.component.mainNavIsShowing).toBeFalsy();
      this.component.isAuthenticated = true;

      const newClass = this.component.profileClasses();

      expect(newClass).toBe('profile-container')
    });

    it('Checks nav showing indicator not added to class list if not authenticated', () => {
      this.component.profileNavIsShowing = true;
      expect(this.component.isAuthenticated).toBeFalsy();

      const newClass = this.component.profileClasses();

      expect(newClass).toBe('profile-container')
    });
  });

  describe('Tests giveClasses()', () => {
    it('Checks nav showing indicator added to class list if nav showing', () => {
      this.component.giveNavIsShowing = true;

      const newClass = this.component.giveClasses();

      expect(newClass).toBe('give-container nav-is-showing')
    });

    it('Checks nav showing indicator not added to class list if nav not showing', () => {
      expect(this.component.giveNavIsShowing).toBeFalsy();

      const newClass = this.component.giveClasses();

      expect(newClass).toBe('give-container')
    });
  });

  describe('Tests rootURL()', () => {
    it('should return root URL', () => {
      expect(this.component.rootURL()).toBe('https://int.crossroads.net');
    });
  });

  describe('Tests closeNav()', () => {
    it('Checks navs not showing', () => {
      const fakeEvent = {
        preventDefault: jest.fn()
      };

      this.component.giveNavIsShowing = true;

      this.component.closeNav(fakeEvent);

      expect(this.component.giveNavIsShowing).toBe(false);
      expect(this.component.mainNavIsShowing).toBe(false);
      expect(this.component.profileNavIsShowing).toBe(false);

      expect(document.body.style.overflow).toBe('scroll');
      expect(document.body.style.position).toBe('');
      expect(document.body.style.width).toBe('');
    });
  });


  describe('Tests navCloseClasses()', () => {
    it('Checks expected class name returned when navs are all closed', () => {
      expect(this.component.mainNavIsShowing).toBe(false);
      expect(this.component.profileNavIsShowing).toBe(false);
      expect(this.component.giveNavIsShowing).toBe(false);

      const classes = this.component.navCloseClasses();

      expect(classes).toBe('close-nav');
    });

    it('Checks expected class name returned when main nav is open', () => {
      this.component.mainNavIsShowing = true;

      const classes = this.component.navCloseClasses();

      expect(classes).toBe('close-nav is-showing');
    });

    it('Checks expected class name returned when profile nav is open', () => {
      this.component.profileNavIsShowing = true;

      const classes = this.component.navCloseClasses();

      expect(classes).toBe('close-nav is-showing');
    });

    it('Checks expected class name returned when give nav is open', () => {
      this.component.giveNavIsShowing = true;

      const classes = this.component.navCloseClasses();

      expect(classes).toBe('close-nav is-showing');
    });
  });


  describe('Tests handleScroll()', () => {
    beforeEach(() => {
      this.fakeEvent = {
        preventDefault: jest.fn()
      };
    });

    it('Checks navs closed if main nav showing', () => {
      this.component.mainNavIsShowing = true;

      this.component.handleScroll(this.fakeEvent);

      expect(this.component.giveNavIsShowing).toBe(false);
      expect(this.component.mainNavIsShowing).toBe(false);
      expect(this.component.profileNavIsShowing).toBe(false);

      expect(document.body.style.overflow).toBe('scroll');
      expect(document.body.style.position).toBe('');
      expect(document.body.style.width).toBe('');
    });

    it('Checks navs closed if give nav showing', () => {
      this.component.giveNavIsShowing = true;

      this.component.handleScroll(this.fakeEvent);

      expect(this.component.giveNavIsShowing).toBe(false);
      expect(this.component.mainNavIsShowing).toBe(false);
      expect(this.component.profileNavIsShowing).toBe(false);

      expect(document.body.style.overflow).toBe('scroll');
      expect(document.body.style.position).toBe('');
      expect(document.body.style.width).toBe('');
    });

    it('Checks navs closed if profile nav showing', () => {
      this.component.profileNavIsShowing = true;

      this.component.handleScroll(this.fakeEvent);

      expect(this.component.giveNavIsShowing).toBe(false);
      expect(this.component.mainNavIsShowing).toBe(false);
      expect(this.component.profileNavIsShowing).toBe(false);

      expect(document.body.style.overflow).toBe('scroll');
      expect(document.body.style.position).toBe('');
      expect(document.body.style.width).toBe('');
    });

    it('Checks nothing is changed if no navs are open', () => {
      this.component.handleScroll(this.fakeEvent);

      expect(this.fakeEvent.preventDefault).not.toBeCalled();
    });
  });

  describe('Tests toggleMenu()', () => {
    beforeEach(() => {
      this.fakeEvent = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn()
      }
    });

    it('Checks toggling main-nav', () => {
      expect(this.component.giveNavIsShowing).toBe(false);
      expect(this.component.mainNavIsShowing).toBe(false);
      expect(this.component.profileNavIsShowing).toBe(false);

      this.component.toggleMenu(this.fakeEvent, 'main-nav');

      expect(this.component.giveNavIsShowing).toBe(false);
      expect(this.component.mainNavIsShowing).toBe(true);
      expect(this.component.profileNavIsShowing).toBe(false);

      expect(document.body.style.overflow).toBe('hidden');
      expect(document.body.style.position).toBe('absolute');
      expect(document.body.style.width).toBe('100vw');
    });

    it('Checks toggling main-nav when nav is showing', () => {
      this.component.mainNavIsShowing = true;

      expect(this.component.giveNavIsShowing).toBe(false);
      expect(this.component.profileNavIsShowing).toBe(false);

      this.component.toggleMenu(this.fakeEvent, 'main-nav');

      expect(this.component.giveNavIsShowing).toBe(false);
      expect(this.component.mainNavIsShowing).toBe(false);
      expect(this.component.profileNavIsShowing).toBe(false);

      expect(document.body.style.overflow).toBe('scroll');
      expect(document.body.style.position).toBe('');
      expect(document.body.style.width).toBe('');
    });

    it('Checks toggling profile-nav', () => {
      expect(this.component.giveNavIsShowing).toBe(false);
      expect(this.component.mainNavIsShowing).toBe(false);
      expect(this.component.profileNavIsShowing).toBe(false);

      this.component.toggleMenu(this.fakeEvent, 'profile-nav');

      expect(this.component.giveNavIsShowing).toBe(false);
      expect(this.component.mainNavIsShowing).toBe(false);
      expect(this.component.profileNavIsShowing).toBe(true);

      expect(document.body.style.overflow).toBe('hidden');
      expect(document.body.style.position).toBe('absolute');
      expect(document.body.style.width).toBe('100vw');
    });

    it('Checks toggling profile-nav when nav is showing', () => {
      this.component.profileNavIsShowing = true;

      expect(this.component.giveNavIsShowing).toBe(false);
      expect(this.component.mainNavIsShowing).toBe(false);

      this.component.toggleMenu(this.fakeEvent, 'profile-nav');

      expect(this.component.giveNavIsShowing).toBe(false);
      expect(this.component.mainNavIsShowing).toBe(false);
      expect(this.component.profileNavIsShowing).toBe(false);

      expect(document.body.style.overflow).toBe('scroll');
      expect(document.body.style.position).toBe('');
      expect(document.body.style.width).toBe('');
    });


    it('Checks toggling give-nav', () => {
      expect(this.component.giveNavIsShowing).toBe(false);
      expect(this.component.mainNavIsShowing).toBe(false);
      expect(this.component.profileNavIsShowing).toBe(false);

      this.component.toggleMenu(this.fakeEvent, 'give-nav');

      expect(this.component.giveNavIsShowing).toBe(true);
      expect(this.component.mainNavIsShowing).toBe(false);
      expect(this.component.profileNavIsShowing).toBe(false);

      expect(document.body.style.overflow).toBe('hidden');
      expect(document.body.style.position).toBe('absolute');
      expect(document.body.style.width).toBe('100vw');
    });

    it('Checks toggling give-nav when nav is showing', () => {
      this.component.giveNavIsShowing = true;

      expect(this.component.profileNavIsShowing).toBe(false);
      expect(this.component.mainNavIsShowing).toBe(false);

      this.component.toggleMenu(this.fakeEvent, 'give-nav');

      expect(this.component.giveNavIsShowing).toBe(false);
      expect(this.component.mainNavIsShowing).toBe(false);
      expect(this.component.profileNavIsShowing).toBe(false);

      expect(document.body.style.overflow).toBe('scroll');
      expect(document.body.style.position).toBe('');
      expect(document.body.style.width).toBe('');
    });
  });

  describe('Tests render()', () => {
    it('Checks auth is initialized', () => {
      this.component.config = {};
      this.component.data = {give: {}, profile: {}};

      expect(this.component.auth).toEqual({});

      this.component.render();

      expect(this.component.auth).not.toEqual({});
    });

    it('Checks element returned has main-nav', () => {
      this.component.data = {give: {}, profile: {}};

      const rendered = this.component.render();

      expect(rendered[1].$tag$).toBe('main-nav');
    });

    it('Checks element returned has give-nav', () => {
      this.component.data = {give: {}, profile: {}};

      const rendered = this.component.render();

      expect(rendered[0].$children$[0].$children$[1].$tag$).toBe('give-nav');
    });

    it('Checks element returned has profile-nav', () => {
      this.component.data = {give: {}, profile: {}};

      const rendered = this.component.render();

      expect(rendered[0].$children$[0].$children$[2].$tag$).toBe('profile-nav');
    });
  });
});

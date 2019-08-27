jest.mock('../../../shared/auth');
import { GlobalNav } from './global-nav';

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
      const fakeEvent = {stopPropagation: jest.fn()};

      this.component.handleProfileClick(fakeEvent);

      expect(fakeEvent.stopPropagation).toBeCalled();
    });

    it('Checks navClickHandler to be called if authenticated', () => {
      const fakeEvent = {};
      this.component.navClickHandler = jest.fn();
      this.component.auth = {authenticated: true}

      this.component.handleProfileClick(fakeEvent);

      expect(this.component.navClickHandler).toBeCalled();
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
      this.component.authenticated = true;

      const newClass = this.component.profileClasses();

      expect(newClass).toBe('profile-container nav-is-showing')
    });

    it('Checks nav showing indicator not added to class list if nav not showing', () => {
      expect(this.component.mainNavIsShowing).toBeFalsy();
      this.component.authenticated = true;

      const newClass = this.component.profileClasses();

      expect(newClass).toBe('profile-container')
    });

    it('Checks nav showing indicator not added to class list if not authenticated', () => {
      this.component.profileNavIsShowing = true;
      expect(this.component.authenticated).toBeFalsy();

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

  describe('Tests render()', () => {
    it('Checks auth is initialized', () => {
      this.component.config = {};

      expect(this.component.auth).toEqual({});

      this.component.render();

      expect(this.component.auth).not.toEqual({});
    });
  });
});

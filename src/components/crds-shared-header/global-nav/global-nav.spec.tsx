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
      this.component.openNavName = 'main-nav';

      const newClass = this.component.menuClasses();

      expect(newClass).toBe('menu-container nav-is-showing')
    });

    it('Checks nav showing indicator not added to class list if nav not showing', () => {
      expect(this.component.openNavName).not.toBe('main-nav');

      const newClass = this.component.menuClasses();

      expect(newClass).toBe('menu-container')
    });
  });

  describe('Tests profileClasses()', () => {
    it('Checks nav showing indicator added to class list if nav showing and authenticated', () => {
      this.component.openNavName = 'profile-nav';
      this.component.isAuthenticated = true;

      const newClass = this.component.profileClasses();

      expect(newClass).toBe('profile-container nav-is-showing')
    });

    it('Checks nav showing indicator not added to class list if nav not showing', () => {
      expect(this.component.openNavName).not.toBe('profile-nav');
      this.component.isAuthenticated = true;

      const newClass = this.component.profileClasses();

      expect(newClass).toBe('profile-container')
    });

    it('Checks nav showing indicator not added to class list if not authenticated', () => {
      this.component.openNavName = 'profile-nav';
      expect(this.component.isAuthenticated).toBeFalsy();

      const newClass = this.component.profileClasses();

      expect(newClass).toBe('profile-container')
    });
  });

  describe('Tests giveClasses()', () => {
    it('Checks nav showing indicator added to class list if nav showing', () => {
      this.component.openNavName = 'give-nav';

      const newClass = this.component.giveClasses();

      expect(newClass).toBe('give-container nav-is-showing')
    });

    it('Checks nav showing indicator not added to class list if nav not showing', () => {
      expect(this.component.openNavName).not.toBe('give-nav');

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

      this.component.openNavName = 'give-nav';

      this.component.closeNav(fakeEvent);

      expect(this.component.openNavName).toBe('');

      expect(document.body.style.overflow).toBe('scroll');
      expect(document.body.style.position).toBe('');
      expect(document.body.style.width).toBe('');
    });
  });


  describe('Tests navCloseClasses()', () => {
    const navNames = ['main-nav', 'give-nav', 'profile-nav'];
    navNames.forEach(nav => {
      it(`Checks expected class name returned when ${nav} is open`, () => {
        this.component.openNavName = nav;

        const classes = this.component.navCloseClasses();

        expect(classes).toBe('close-nav is-showing');
      });
    });

    it('Checks expected class name returned when navs are all closed', () => {
      this.component.openNavName = '';

      const classes = this.component.navCloseClasses();

      expect(classes).toBe('close-nav');
    });

    it('Checks expected class name returned if unknown nav is "open"', () => {
      this.component.openNavName = 'super-fake-nav-name';

      const classes = this.component.navCloseClasses();

      expect(classes).toBe('close-nav');
    });
  });

  describe('Tests toggleMenu()', () => {
    beforeEach(() => {
      this.fakeEvent = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn()
      }
    });

    it('Checks open menu is toggled closed', () => {
      this.component.openNavName = 'give-nav';

      this.component.toggleMenu(this.fakeEvent, 'give-nav');

      expect(this.component.openNavName).toBe('');
    });

    it('Checks new menu is toggled', () => {
      this.component.openNavName = 'give-nav';

      this.component.toggleMenu(this.fakeEvent, 'main-nav');

      expect(this.component.openNavName).toBe('main-nav');
    });

    it('Checks closed menu is toggled open', () => {
      this.component.openNavName = '';

      this.component.toggleMenu(this.fakeEvent, 'give-nav');

      expect(this.component.openNavName).toBe('give-nav');
    });

    it('Checks expected doc style is set when nav toggled open', () => {
      this.component.openNavName = '';

      this.component.toggleMenu(this.fakeEvent, 'main-nav');

      expect(document.body.style.overflow).toBe('hidden');
      expect(document.body.style.position).toBe('absolute');
      expect(document.body.style.width).toBe('100vw');
    });

    it('Checks expected doc style is set when nav changes', () => {
      this.component.openNavName = 'give-nav';

      this.component.toggleMenu(this.fakeEvent, 'main-nav');

      expect(this.component.openNavName).toBe('main-nav');

      expect(document.body.style.overflow).toBe('hidden');
      expect(document.body.style.position).toBe('absolute');
      expect(document.body.style.width).toBe('100vw');
    });

    it('Checks expected doc style is set when nav toggled closed', () => {
      this.component.openNavName = 'main-nav';

      this.component.toggleMenu(this.fakeEvent, 'main-nav');

      expect(document.body.style.overflow).toBe('scroll');
      expect(document.body.style.position).toBe('');
      expect(document.body.style.width).toBe('');
    });

    it('Checks expected doc style is set when unknown nav toggled "open"', () => {
      this.component.openNavName = 'main-nav';

      this.component.toggleMenu(this.fakeEvent, 'super-fake-nav');

      expect(this.component.openNavName).toBe('super-fake-nav');

      expect(document.body.style.overflow).toBe('scroll');
      expect(document.body.style.position).toBe('');
      expect(document.body.style.width).toBe('');
    });
  });

  describe('Tests render()', () => {
    beforeEach(() => {
      this.component.data = {give: {}, profile: {}};
    });

    it('Checks auth is initialized', () => {
      this.component.config = {};

      expect(this.component.auth).toEqual({});

      this.component.render();

      expect(this.component.auth).not.toEqual({});
    });

    it('Checks element returned has main-nav', () => {
      const rendered = this.component.render();

      expect(rendered[1].$tag$).toBe('main-nav');
    });

    it('Checks element returned has give-nav', () => {
      const rendered = this.component.render();

      expect(rendered[0].$children$[0].$children$[1].$tag$).toBe('give-nav');
    });

    it('Checks element returned has profile-nav', () => {
      const rendered = this.component.render();

      expect(rendered[0].$children$[0].$children$[2].$tag$).toBe('profile-nav');
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
        this.component.offset = 15;
        this.component.openNavName = styledNavs;

        const rendered = this.component.render();

        expect(rendered[0].$attrs$.style.top).toBe('15px');
      });
    });

    it(`Checks header style if main-nav is opened`, () => {
      this.component.offset = 15;
      this.component.openNavName = 'main-nav';

      const rendered = this.component.render();

      expect(rendered[0].$attrs$.style.top).toBe('0px');
    });
  });

  //TODO need better negative tests
  describe('Tests maybeRenderIcons()', () => {
    it('Checks falsy returned if non-array given', () => {
      const rendered = this.component.maybeRenderIcons({icon: '123'});

      expect(rendered).toBeFalsy();
    });

    it('Checks empty list returned if given empty array', () => {
      const rendered = this.component.maybeRenderIcons([]);

      expect(rendered).toHaveLength(0);
      expect(rendered).toEqual([]);
    });

    it('Checks element has expected attributes if given config for one icon', () => {
      const oneIcon = [{
        'class': 'iconClass',
        'innerHTML': '123'
      }]
      const rendered = this.component.maybeRenderIcons(oneIcon);

      expect(rendered).toHaveLength(1);
      expect(rendered[0].$tag$).toBe('div');
      expect(rendered[0].$attrs$.class).toBe(oneIcon[0].class);
      expect(rendered[0].$attrs$.innerHTML).toBe(oneIcon[0].innerHTML);
    });

    it('Checks elements have expected attributes if given config for more than one icon', () => {
      const manyIcons = [{
        'class': 'iconClass',
        'innerHTML': '123'
      },
      {
        'class': 'iconClass2',
        'innerHTML': '12345'
      }]
      const rendered = this.component.maybeRenderIcons(manyIcons);

      expect(rendered).toHaveLength(manyIcons.length);
      manyIcons.forEach((icon, i) => {
        expect(rendered[i].$tag$).toBe('div');
        expect(rendered[i].$attrs$.class).toBe(icon.class);
        expect(rendered[i].$attrs$.innerHTML).toBe(icon.innerHTML);
      });
    });

    //authenticated, not authenticated, TODO missing
    it('Checks element has expected innerHTML when authenticated', () => {
      this.component.isAuthenticated = true;
      const oneIcon = [{
        'class': 'iconClass',
        'innerHTML': {
          'authenticated': '123',
          'not-authenticated': 'nope!'
        }
      }]

      const rendered = this.component.maybeRenderIcons(oneIcon);

      expect(rendered).toHaveLength(1);
      expect(rendered[0].$tag$).toBe('div');
      expect(rendered[0].$attrs$.class).toBe(oneIcon[0].class);
      expect(rendered[0].$attrs$.innerHTML).toBe(oneIcon[0].innerHTML.authenticated);
    });

    it('Checks element has expected innerHTML when not authenticated', () => {
      this.component.isAuthenticated = false;
      const oneIcon = [{
        'class': 'iconClass',
        'innerHTML': {
          'authenticated': '123',
          'not-authenticated': 'nope!'
        }
      }]

      const rendered = this.component.maybeRenderIcons(oneIcon);

      expect(rendered).toHaveLength(1);
      expect(rendered[0].$tag$).toBe('div');
      expect(rendered[0].$attrs$.class).toBe(oneIcon[0].class);
      expect(rendered[0].$attrs$.innerHTML).toBe(oneIcon[0].innerHTML['not-authenticated']);
    });
  });
  //TODO need thorough renderNavLink test

  describe('Tests renderNavLink()', () => {
    const mainMenu = {
      'class-name': 'menu-container',
      'nav-name': 'main-nav',
      'href': '',
      'automation-id': 'sh-menu',
      'label': 'menu',
      'icons': [
        {
          'class': 'menu',
          'innerHTML': '123'
        },
        {
          'class': 'close',
          'innerHTML': '456'
        }
      ]
    }

    it('Checks a simple nav-menu container has expected elements when closed', () => {
      const rendered = this.component.renderNavLink(mainMenu);

      expect(rendered.$tag$).toBe('a');
      expect(rendered.$attrs$['data-automation-id']).toBe(mainMenu['automation-id']);
      expect(rendered.$attrs$['href']).toBe('');
      expect(rendered.$attrs$['data-label']).toBe(mainMenu['label']);
      expect(rendered.$attrs$['class']).toBe(mainMenu['class-name']);

      expect(rendered.$children$).toHaveLength(2);
      mainMenu.icons.forEach((icon, i) => {
        expect(rendered.$children$[i].$tag$).toBe('div');
        expect(rendered.$children$[i].$attrs$.class).toBe(icon.class);
        expect(rendered.$children$[i].$attrs$.innerHTML).toBe(icon.innerHTML);
      });
    });

    it('Checks a simple nav-menu container has expected elements when closed', () => {
      this.component.openNavName = 'main-nav';
      const rendered = this.component.renderNavLink(mainMenu);

      expect(rendered.$attrs$['data-automation-id']).toBe(mainMenu['automation-id']);
      expect(rendered.$attrs$['class']).toBe(`${mainMenu['class-name']} nav-is-showing`);
    });
    //TODO start with positive tests, then add negative once all situations covered
  });
});

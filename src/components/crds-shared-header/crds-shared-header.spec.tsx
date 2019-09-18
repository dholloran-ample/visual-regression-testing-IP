import { SharedHeader } from "./crds-shared-header";

const navPayload = [
  {
    "title": "Watch, Listen, Read",
    "description": "Videos, music, articles and podcasts",
    "background": "//crds-media.imgix.net/...",
    "children": [
      [
        {
          "title": "All Media",
          "href": "https://int.crossroads.net/media",
          "top_level": true,
          "automation-id": "sh-all-media"
        }
      ],
      "Types"
    ]
  },
  {
    "title": "Get Connected",
    "description": "Groups, camps, serve locally and globally, kids",
    "background": "//crds-media.imgix.net/...",
    "children": [
      []
    ]
  }
]

describe('<crds-shared-header>', () => {
  beforeEach(() => {
    this.component = new SharedHeader();
    this.component.env = 'int';
  });

  describe('Tests componentWillLoad()', () => {
    it('Checks data is retrieved', async () => {
      expect(this.component.data).toEqual([]);

      await this.component.componentWillLoad();

      expect(Array.isArray(this.component.data)).toBeFalsy();
      expect(this.component.data['config']).not.toBeUndefined();
    });
  });

  describe('Tests componentDidLoad()', () => {
    it('Checks element is required', () => {
      expect(() => this.component.componentDidLoad()).toThrow();
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

  describe('Tests closeMenus()', () => {
    it('Checks navs not showing', () => {
      const fakeEvent = {
        preventDefault: jest.fn()
      };

      this.component.giveNavIsShowing = true;

      this.component.closeMenus(fakeEvent);

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

      expect(classes).toBe('close');
    });

    it('Checks expected class name returned when main nav is open', () => {
      this.component.mainNavIsShowing = true;

      const classes = this.component.navCloseClasses();

      expect(classes).toBe('close is-showing');
    });

    it('Checks expected class name returned when profile nav is open', () => {
      this.component.profileNavIsShowing = true;

      const classes = this.component.navCloseClasses();

      expect(classes).toBe('close is-showing');
    });

    it('Checks expected class name returned when give nav is open', () => {
      this.component.giveNavIsShowing = true;

      const classes = this.component.navCloseClasses();

      expect(classes).toBe('close is-showing');
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
});
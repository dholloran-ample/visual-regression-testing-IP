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
    //TODO neg tests?
  });

  describe('Tests componentDidLoad()', () => {
    it('Checks element is required', () => {
      expect(() => this.component.componentDidLoad()).toThrow();
    });
    //TODO checks parent element of class is changed in e2e
  });

  describe('Tests onClick()', () => {
    it('Checks active is set to given value', () => {
      const fakeEvent = {
        preventDefault: jest.fn()
      };

      expect(this.component.active).toBeUndefined();

      this.component.onClick(fakeEvent, 'sh-nav');

      expect(fakeEvent.preventDefault).toBeCalled();
      expect(this.component.active).toBe('sh-nav');
    });
  });

  describe('Tests renderSections()', () => {
    it('Checks null is returned if payload missing', () => {
      const rendered = this.component.renderSections(undefined);

      expect(rendered).toBeNull();
    });

    //TODO move to e2e?
    it('Checks list of nav-section are returned for each entry in the payload', () => {
      const rendered = this.component.renderSections(navPayload);

      expect(rendered[0].$attrs$.slug).toBe('watch-listen-read');
      expect(rendered[1].$attrs$.slug).toBe('get-connected');

      [0,1].forEach(elementIndex => {
        expect(rendered[elementIndex].$attrs$.isActive).toBe(false);
        expect(rendered[elementIndex].$tag$).toBe('nav-section');
        expect(rendered[elementIndex].$children$[0].$children$[0].$text$).toBe(navPayload[elementIndex].title);
        expect(rendered[elementIndex].$children$[1].$children$[0].$text$).toBe(navPayload[elementIndex].description);
      });
    });

    it('Checks expected nav-section is marked active', () => {
      this.component.active = 'get-connected'
      const rendered = this.component.renderSections(navPayload);

      expect(rendered[0].$attrs$.isActive).toBe(false);
      expect(rendered[1].$attrs$.isActive).toBe(true);
    });
  });

  describe('Tests handleBackClick()', () => {
    it('Checks active is set to null', () => {
      const fakeEvent = {
        preventDefault: jest.fn()
      };
      this.component.active = 'sh-nav';

      this.component.handleBackClick(fakeEvent);

      expect(fakeEvent.preventDefault).toBeCalled();
      expect(this.component.active).toBeNull();
    });
  });

  describe('Tests renderSubnavs()', () => {
    it('Checks null is returned if payload missing', () => {
      const rendered = this.component.renderSubnavs(undefined);

      expect(rendered).toBeNull();
    });

    //TODO move to e2e?
    it('Checks list of nav-section-subnav are returned for each entry in the payload', () => {
      this.component.active = 'sh-nav'

      const rendered = this.component.renderSubnavs(navPayload);

      expect(rendered.$attrs$.class).toBe('subnavigation');

      expect(rendered.$children$[0].$attrs$.slug).toBe('watch-listen-read');
      expect(rendered.$children$[1].$attrs$.slug).toBe('get-connected');

      [0,1].forEach(elementIndex => {
        expect(rendered.$children$[elementIndex].$tag$).toBe('nav-section-subnav');

        expect(rendered.$children$[elementIndex].$attrs$.active).toBe('sh-nav');
        expect(typeof rendered.$children$[elementIndex].$attrs$.onBack).toEqual('function');
        expect(rendered.$children$[elementIndex].$children$[0].$children$[0].$text$).toBe(navPayload[elementIndex].title);
      });
    });
  });

  describe('Tests renderChildren()', () => {
    it('Checks empty list is returned if child list is empty', () => {
      const section = {title: 'Section title', children: []}

      const rendered = this.component.renderChildren(section, {});

      expect(rendered[0].$children$[0].$text$).toBe(section.title);
      expect(rendered[0].$tag$).toBe('h2');
      expect(rendered).toHaveLength(1);
    });

    it('Checks empty list is returned if child list contains only strings', () => {
      const section = {title: 'Section title', children: ['One string', 'Two strings', 'Three strings']}

      const rendered = this.component.renderChildren(section);

      expect(rendered[0].$children$[0].$text$).toBe(section.title);
      expect(rendered[0].$tag$).toBe('h2');

      [1,2,3].forEach(elementIndex => {
        expect(rendered[elementIndex].$children$[0].$text$).toBe(section.children[elementIndex - 1]);
      });
    });

    it('Checks list has top-level in class', () => {
      const section = {title: 'Section title', children: [[{
        "title": "My profile",
        "automation-id": "sh-my-profile",
        "href": "https://int.crossroads.net/profile/personal",
        "top_level": true
      }]]}

      const rendered = this.component.renderChildren(section);

      expect(rendered[1].$children$[0].$attrs$.class).toEqual('top-level');
    });

    it('Checks list does not have top-level in class', () => {
      const section = {title: 'Section title', children: [[{
        "title": "My profile",
        "automation-id": "sh-my-profile",
        "href": "https://int.crossroads.net/profile/personal",
        "top_level": false
      }]]}

      const rendered = this.component.renderChildren(section);

      expect(rendered[1].$children$[0].$attrs$.class).toBeNull();
    });

    it('Checks list does not have top-level in class if not property in child', () => {
      const section = {title: 'Section title', children: [[{
        "title": "My profile",
        "automation-id": "sh-my-profile",
        "href": "https://int.crossroads.net/profile/personal"
      }]]}

      const rendered = this.component.renderChildren(section);

      expect(rendered[1].$children$[0].$attrs$.class).toBeNull();
    });

    it('Checks list has # as href if not given href in child', () => {
      const section = {title: 'Section title', children: [[{
        "title": "My profile",
        "automation-id": "sh-my-profile"
      }]]}

      const rendered = this.component.renderChildren(section);

      expect(rendered[1].$children$[0].$children$[0].$attrs$['href']).toBe('#');
    });

    it('Checks list of elements is returned if child list contains expected objects', () => {
      const section = {title: 'Section title', children: [[{
        "title": "My profile",
        "automation-id": "sh-my-profile",
        "href": "https://int.crossroads.net/profile/personal",
        "top_level": false
      }]]}

      const rendered = this.component.renderChildren(section);
      const renderedElement = rendered[1].$children$[0].$children$[0];

      expect(renderedElement.$attrs$['data-automation-id']).toBe(section.children[0][0]['automation-id']);
      expect(renderedElement.$attrs$['href']).toBe(section.children[0][0]['href']);
      expect(renderedElement.$children$[0].$text$).toBe(section.children[0][0]['title']);
      expect(renderedElement.$tag$).toBe('a');
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

  describe('Tests navClasses()', () => {
    const scenarios = [
      {
        mainNav: true,
        activeSection: undefined,
        giveNav: false,
        profileNav: false,
        className: 'is-showing'
      },
      {
        mainNav: true,
        activeSection: 'some-nav',
        giveNav: false,
        profileNav: false,
        className: 'is-showing section--some-nav'
      },
      {
        mainNav: false,
        activeSection: 'some-nav',
        giveNav: false,
        profileNav: false,
        className: 'section--some-nav'
      },
      {
        mainNav: true,
        activeSection: undefined,
        giveNav: true,
        profileNav: false,
        className: ''
      },
      {
        mainNav: true,
        activeSection: 'some-nav',
        giveNav: true,
        profileNav: false,
        className: ''
      },
      {
        mainNav: false,
        activeSection: 'some-nav',
        giveNav: true,
        profileNav: false,
        className: ''
      },
      {
        mainNav: true,
        activeSection: undefined,
        giveNav: false,
        profileNav: true,
        className: ''
      },
      {
        mainNav: true,
        activeSection: 'some-nav',
        giveNav: false,
        profileNav: true,
        className: ''
      },
      {
        mainNav: false,
        activeSection: 'some-nav',
        giveNav: false,
        profileNav: true,
        className: ''
      },
      {
        mainNav: true,
        activeSection: undefined,
        giveNav: true,
        profileNav: true,
        className: ''
      },
      {
        mainNav: true,
        activeSection: 'some-nav',
        giveNav: true,
        profileNav: true,
        className: ''
      },
      {
        mainNav: false,
        activeSection: 'some-nav',
        giveNav: true,
        profileNav: true,
        className: ''
      }
    ]

    scenarios.forEach(navCombo => {
      it(`Checks class string matches ${navCombo.className} given main-nav "${navCombo.mainNav}", give-nav "${navCombo.giveNav}", profile-nav "${navCombo.profileNav}", and active section "${navCombo.activeSection}"`, () => {
        this.component.mainNavIsShowing = navCombo.mainNav;
        this.component.active = navCombo.activeSection;
        this.component.giveNavIsShowing = navCombo.giveNav;
        this.component.profileNavIsShowing = navCombo.profileNav;

        const classes = this.component.navClasses();

        expect(classes).toBe(navCombo.className)
      });
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
//TODO e2e for render
});
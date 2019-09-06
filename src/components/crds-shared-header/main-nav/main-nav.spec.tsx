import { MainMenu } from "./main-nav";

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

describe('<main-nav>', () => {
  beforeEach(() => {
    this.component = new MainMenu();
  });

  describe('Tests getNavClass()', () => {
    const scenarios = [
      {
        mainNav: true,
        activeSection: undefined,
        className: 'is-showing'
      },
      {
        mainNav: true,
        activeSection: 'some-nav',
        className: 'is-showing section--some-nav'
      },
      {
        mainNav: false,
        activeSection: 'some-nav',
        className: 'section--some-nav'
      },
      {
        mainNav: false,
        activeSection: undefined,
        className: ''
      }
    ]

    scenarios.forEach(navCombo => {
      it(`Checks class string matches ${navCombo.className} given main-nav "${navCombo.mainNav}" and active section "${navCombo.activeSection}"`, () => {
        this.component.isNavShowing = navCombo.mainNav;
        this.component.activeSection = navCombo.activeSection;

        const classes = this.component.getNavClass();

        expect(classes).toBe(navCombo.className)
      });
    });
  });

  describe('Tests maybeRenderSections()', () => {
    it('Checks falsy  returned if data is empty list', () => {
      this.component.data = [];

      const rendered = this.component.maybeRenderSections();

      expect(rendered).toBeFalsy();
    });

    it('Checks list of nav-section are returned for each entry in the payload', () => {
      this.component.data = navPayload;

      const rendered = this.component.maybeRenderSections();

      expect(rendered.$children$[0].$attrs$.sectionName).toBe('watch-listen-read');
      expect(rendered.$children$[1].$attrs$.sectionName).toBe('get-connected');

      [0,1].forEach(elementIndex => {
        expect(rendered.$children$[elementIndex].$attrs$.isActive).toBe(false);
        expect(rendered.$children$[elementIndex].$tag$).toBe('nav-section');
        expect(rendered.$children$[elementIndex].$children$[0].$children$[0].$text$).toBe(navPayload[elementIndex].title);
        expect(rendered.$children$[elementIndex].$children$[1].$children$[0].$text$).toBe(navPayload[elementIndex].description);
      });
    });

    it('Checks expected nav-section is marked active', () => {
      this.component.data = navPayload;
      this.component.activeSection = 'get-connected'

      const rendered = this.component.maybeRenderSections();

      expect(rendered.$children$[0].$attrs$.isActive).toBe(false);
      expect(rendered.$children$[1].$attrs$.isActive).toBe(true);
    });
  });

  describe('Tests maybeRenderActiveSubNav()', () => {
    it('Checks falsy  returned if data is empty list', () => {
      this.component.data = [];

      const rendered = this.component.maybeRenderActiveSubNav();

      expect(rendered).toBeFalsy();
    });

    it('Checks falsy returned if activeSection is not in nav data', () => {
      this.component.data = navPayload;
      this.component.activeSection = 'fake-nav';

      const rendered = this.component.maybeRenderActiveSubNav();

      expect(rendered).toBeFalsy();
    });

    it('Checks nav-section-subnav is returned for active section', () => {
      this.component.data = navPayload;
      this.component.activeSection = 'get-connected';

      const rendered = this.component.maybeRenderActiveSubNav();

      expect(rendered.$attrs$.subNavName).toBe('get-connected');
      expect(rendered.$attrs$.isActive).toBe(true);
      expect(typeof rendered.$attrs$.handleBackClick).toEqual('function');

      expect(rendered.$tag$).toBe('nav-section-subnav');
      expect(rendered.$children$[0].$tag$).toBe('h2');
      expect(rendered.$children$[0].$children$[0].$text$).toBe(navPayload[1].title);
    });
  });

  describe('Tests renderSubNavOrCtas()', () => {
    it('Checks subnav is returned if a section is active', () => {
      this.component.data = navPayload;
      this.component.activeSection = 'get-connected';

      const rendered = this.component.renderSubNavOrCtas();

      expect(rendered.$tag$).toBe('div');
      expect(rendered.$attrs$.class).toBe('subnavigation');

      expect(rendered.$children$[0].$tag$).toBe('nav-section-subnav');
      expect(rendered.$children$[0].$attrs$.subNavName).toBe('get-connected');
      expect(rendered.$children$[0].$attrs$.isActive).toBe(true);
      expect(typeof rendered.$children$[0].$attrs$.handleBackClick).toEqual('function');
    });

    it('Checks ctas are returned if no section is active', () => {
      this.component.data = navPayload;
      this.component.activeSection = undefined;

      const rendered = this.component.renderSubNavOrCtas();

      expect(rendered.$tag$).toBe('nav-ctas');
    });
  });

  describe('Tests handleSectionClick()', () => {
    it('Checks active is set to given value', () => {
      const fakeEvent = {
        preventDefault: jest.fn()
      };

      expect(this.component.activeSection).toBeUndefined();

      this.component.handleSectionClick(fakeEvent, 'sh-nav');

      expect(fakeEvent.preventDefault).toBeCalled();
      expect(this.component.activeSection).toBe('sh-nav');
    });
  });

  describe('Tests handleBackClick()', () => {
    it('Checks active is set to null', () => {
      const fakeEvent = {
        preventDefault: jest.fn()
      };
      this.component.activeSection = 'sh-nav';

      this.component.handleBackClick(fakeEvent);

      expect(fakeEvent.preventDefault).toBeCalled();
      expect(this.component.activeSection).toBeNull();
    });
  });

  describe('Tests render()', () => {
    it('Checks null is returned if main nav is not showing', () => {
      this.component.isNavShowing = false;

      const rendered = this.component.render();

      expect(rendered).toBeNull();
    });

    const invalidData = [undefined, true, false, "String", null];
    invalidData.forEach(badValue => {
      it(`Checks null is returned if main component's data is "${badValue}"`, () => {
        this.component.isNavShowing = true;
        this.component.data = badValue;

        const rendered = this.component.render();

        expect(rendered).toBeNull();
      });
    });

    it('Checks main nav element is returned', () => {
      this.component.isNavShowing = true;
      this.component.data = navPayload;

      const rendered = this.component.render();

      expect(rendered.$attrs$.class).toBe('is-showing');
    });

    it('Checks main nav contains nav elements', () => {
      this.component.isNavShowing = true;
      this.component.data = navPayload;

      const rendered = this.component.render();

      expect(rendered.$tag$).toBe('nav');

      expect(rendered.$children$[0].$tag$).toBe('div');
      expect(rendered.$children$[0].$attrs$.class).toBe('content');

      expect(rendered.$children$[0].$children$[0].$tag$).toBe('div');
      expect(rendered.$children$[0].$children$[0].$attrs$.class).toBe('navigation');
      expect(rendered.$children$[0].$children$[0].$children$[0].$tag$).toBe('ul');
      expect(rendered.$children$[0].$children$[0].$children$[0].$children$[0].$tag$).toBe('nav-section');
    });

    it('Checks main nav does not contains subnavigation elements if subsection is closed', () => {
      this.component.isNavShowing = true;
      this.component.data = navPayload;

      const rendered = this.component.render();

      expect(rendered.$children$[0].$children$[0].$attrs$.class).toBe('navigation');

      expect(rendered.$children$[0].$children$[1].$tag$).toBe('nav-ctas');
     });

    it('Checks main nav does not contains cta element if subsection is opened', () => {
      this.component.data = navPayload;
      this.component.activeSection = 'sh-subsection';

      const rendered = this.component.render();

      expect(rendered.$children$[0].$children$[0].$attrs$.class).toBe('navigation');

      expect(rendered.$children$[0].$children$[1].$tag$).toBe('div');
      expect(rendered.$children$[0].$children$[1].$attrs$.class).toBe('subnavigation');

      expect(rendered.$children$[0].$children$[2]).toBeUndefined();
    });
  });
});
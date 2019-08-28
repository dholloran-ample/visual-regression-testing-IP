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

  describe('Tests navClasses()', () => {
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
        this.component.mainNavIsShowing = navCombo.mainNav;
        this.component.activeSection = navCombo.activeSection;

        const classes = this.component.navClasses();

        expect(classes).toBe(navCombo.className)
      });
    });
  });

  describe('Tests maybeRenderSections()', () => {
    it('Checks null is returned if payload missing', () => {
      const rendered = this.component.maybeRenderSections(undefined);

      expect(rendered).toBeFalsy();
    });

    it('Checks list of nav-section are returned for each entry in the payload', () => {
      const rendered = this.component.maybeRenderSections(navPayload);

      expect(rendered[0].$attrs$.sectionName).toBe('watch-listen-read');
      expect(rendered[1].$attrs$.sectionName).toBe('get-connected');

      [0,1].forEach(elementIndex => {
        expect(rendered[elementIndex].$attrs$.isActive).toBe(false);
        expect(rendered[elementIndex].$tag$).toBe('nav-section');
        expect(rendered[elementIndex].$children$[0].$children$[0].$text$).toBe(navPayload[elementIndex].title);
        expect(rendered[elementIndex].$children$[1].$children$[0].$text$).toBe(navPayload[elementIndex].description);
      });
    });

    it('Checks expected nav-section is marked active', () => {
      this.component.activeSection = 'get-connected'
      const rendered = this.component.maybeRenderSections(navPayload);

      expect(rendered[0].$attrs$.isActive).toBe(false);
      expect(rendered[1].$attrs$.isActive).toBe(true);
    });
  });

  describe('Tests maybeRenderSubnavs()', () => {
    it('Checks null is returned if payload missing', () => {
      const rendered = this.component.maybeRenderSubnavs(undefined);

      expect(rendered).toBeFalsy();
    });

    it('Checks list of nav-section-subnav are returned for each entry in the payload', () => {
      this.component.activeSection = 'sh-nav'

      const rendered = this.component.maybeRenderSubnavs(navPayload);

      expect(rendered[0].$attrs$.subNavName).toBe('watch-listen-read');
      expect(rendered[0].$children$[0].$tag$).toBe('h2');
      expect(rendered[0].$children$[0].$children$[0].$text$).toBe(navPayload[0].title);
      expect(rendered[0].$children$[1].$tag$).toBe('ul');

      expect(rendered[1].$attrs$.subNavName).toBe('get-connected');

      [0,1].forEach(elementIndex => {
        expect(rendered[elementIndex].$tag$).toBe('nav-section-subnav');

        expect(rendered[elementIndex].$attrs$.isActive).toBe(false);
        expect(typeof rendered[elementIndex].$attrs$.handleBackClick).toEqual('function');
        expect(rendered[elementIndex].$children$[0].$children$[0].$text$).toBe(navPayload[elementIndex].title);
      });
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
      this.component.mainNavIsShowing = false;

      const rendered = this.component.render();

      expect(rendered).toBeNull();
    });

    const invalidData = [undefined, true, false, "String", null];
    invalidData.forEach(badValue => {
      it(`Checks null is returned if main component's data is "${badValue}"`, () => {
        this.component.mainNavIsShowing = true;
        this.component.data = badValue;

        const rendered = this.component.render();

        expect(rendered).toBeNull();
      });
    });

    it('Checks main nav element is returned', () => {
      this.component.mainNavIsShowing = true;
      this.component.data = navPayload;

      const rendered = this.component.render();

      expect(rendered.$attrs$.class).toBe('is-showing');
    });

    it('Checks main nav contains expected child elements in order', () => {
      this.component.mainNavIsShowing = true;
      this.component.data = navPayload;

      const rendered = this.component.render();

      expect(rendered.$tag$).toBe('nav');

      expect(rendered.$children$[0].$tag$).toBe('div');
      expect(rendered.$children$[0].$attrs$.class).toBe('content');

      expect(rendered.$children$[0].$children$[0].$tag$).toBe('div');
      expect(rendered.$children$[0].$children$[0].$attrs$.class).toBe('navigation');
      expect(rendered.$children$[0].$children$[0].$children$[0].$tag$).toBe('ul');
      expect(rendered.$children$[0].$children$[0].$children$[0].$children$[0].$tag$).toBe('nav-section');

      expect(rendered.$children$[0].$children$[1].$tag$).toBe('div');
      expect(rendered.$children$[0].$children$[1].$attrs$.class).toBe('subnavigation');
      expect(rendered.$children$[0].$children$[1].$children$[0].$tag$).toBe('nav-section-subnav');

      expect(rendered.$children$[0].$children$[2].$tag$).toBe('nav-ctas');
    });

    it('Checks main nav does not contains cta element if subsection is opened', () => {
      this.component.data = navPayload;
      this.component.activeSection = 'sh-subsection';

      const rendered = this.component.render();

      expect(rendered.$tag$).toBe('nav');

      expect(rendered.$children$[0].$tag$).toBe('div');
      expect(rendered.$children$[0].$attrs$.class).toBe('content');

      expect(rendered.$children$[0].$children$[0].$tag$).toBe('div');
      expect(rendered.$children$[0].$children$[0].$attrs$.class).toBe('navigation');
      expect(rendered.$children$[0].$children$[0].$children$[0].$tag$).toBe('ul');
      expect(rendered.$children$[0].$children$[0].$children$[0].$children$[0].$tag$).toBe('nav-section');

      expect(rendered.$children$[0].$children$[1].$tag$).toBe('div');
      expect(rendered.$children$[0].$children$[1].$attrs$.class).toBe('subnavigation');
      expect(rendered.$children$[0].$children$[1].$children$[0].$tag$).toBe('nav-section-subnav');

      expect(rendered.$children$[0].$children$[2]).toBeUndefined();
    });
  });
});
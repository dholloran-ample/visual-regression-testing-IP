import { GiveMenu } from "./give-nav";

const giveNav = {
  "background_img": "https://crds-media.imgix.net/6sNxa1MWhMOfjhAB47yTCa/0acf1af4109f23abc0199b1e34abeb7a/give-bg_2x.jpg?auto=format%2Ccompress",
  "title": "Give test",
  "children": [
    [
      {
        "title": "Give now top level",
        "href": "https://sandbox.pushpay.io/g/crossroadscincinnati",
        "automation-id": "sh-give-now"
      }
    ],
    "About giving",
    [
      {
        "title": "Give subnav",
        "href": "https://sandbox.pushpay.io/g/crossroadscincinnati",
        "automation-id": "sh-give-subnav"
      },
      {
        "title": "My subnav override top level",
        "href": "https://int.crossroads.net/me/giving",
        "top_level": true,
        "automation-id": "sh-my-override-level"
      }
    ],
    [
      {
        "title": "Not subnav",
        "href": "https://sandbox.pushpay.io/g/crossroadscincinnati",
        "automation-id": "sh-give-not-subnav"
      },
      {
        "title": "Not subnav",
        "href": "https://sandbox.pushpay.io/g/crossroadscincinnati",
        "top_level": false,
        "automation-id": "sh-give-not-subnav"
      }
    ]
  ]
}

describe('<give-nav>', () => {
  beforeEach(() => {
    this.component = new GiveMenu();
  });

  describe('Tests navTitle()', () => {
    it("Checks nav title matches data.title property", () => {
      this.component.data = giveNav;

      const title = this.component.navTitle();

      expect(title).toBe(giveNav.title);
    });

    it(`Checks menu title is an empty string if nav object does not contain a title property`, () => {
      this.component.data = {
        children: [
          "Get Involved"
        ]
      }

      const title = this.component.navTitle();

      expect(title).toBe('');
    });
  });

  describe('Tests backgroundImageURL()', () => {
    it("Checks background image matches data.background_img property", () => {
      const image = this.component.backgroundImageURL(giveNav);

      expect(image).toBe(giveNav.background_img);
    });

    it(`Checks background image is an empty string if nav object does not contain a background_img property`, () => {
      const noImageData = {
        children: [
          "Get Involved"
        ]
      }

      const image = this.component.backgroundImageURL(noImageData);

      expect(image).toBe('');
    });
  });

  describe('Tests render()', () => {
    it('Checks null is returned if give nav is not showing', () => {
      this.component.giveNavIsShowing = false;

      const rendered = this.component.render();

      expect(rendered).toBeNull();
    });

    const invalidData = [undefined, [], true, false, "String", null];
    invalidData.forEach(badValue => {
      it(`Checks null is returned if give component's data is "${badValue}"`, () => {
        this.component.giveNavIsShowing = true;
        this.component.data = badValue;

        const rendered = this.component.render();

        expect(rendered).toBeNull();
      });
    });

    it('Checks give nav element is returned', () => {
      this.component.data = giveNav;

      const rendered = this.component.render();

      expect(rendered.$attrs$.class).toBe('give-nav');
    });

    it('Checks background_image when no image property defined', () => {
      this.component.data = {
        "title": "Give test",
        "children": []
      };

      const render = this.component.render();

      expect(render.$attrs$.style.backgroundImage).toBe('url()');
    });

    it('Checks give nav contains all expected child elements', () => {
      this.component.data = giveNav;

      const rendered = this.component.render();

      expect(rendered.$children$[0].$children$).toHaveLength(5);

      const sectionTitle = rendered.$children$[0].$children$[0].$children$[0];
      expect(sectionTitle.$text$).toMatch(/\W?Give\W?/);

      const firstChid = rendered.$children$[0].$children$[1].$children$[0].$children$[0];
      expect(firstChid.$attrs$.class).toBe('top-level');
      expect(firstChid.$children$[0].$attrs$.automationId).toBe(giveNav.children[0][0]['automation-id']);
      expect(firstChid.$children$[0].$attrs$.href).toBe(giveNav.children[0][0]['href']);
      expect(firstChid.$children$[0].$children$[0].$text$).toBe(giveNav.children[0][0]['title']);

      const secondChild = rendered.$children$[0].$children$[2].$children$[0];
      expect(secondChild.$children$[0].$text$).toBe(giveNav.children[1]);
      expect(secondChild.$tag$).toBe('h4');

      const thirdChild = rendered.$children$[0].$children$[3].$children$[0].$children$[0];
      expect(thirdChild.$attrs$.class).toBe('');
      expect(thirdChild.$children$[0].$attrs$.automationId).toBe(giveNav.children[2][0]['automation-id']);
      expect(thirdChild.$children$[0].$attrs$.href).toBe(giveNav.children[2][0]['href']);
      expect(thirdChild.$children$[0].$children$[0].$text$).toBe(giveNav.children[2][0]['title']);

      const fourthChild = rendered.$children$[0].$children$[3].$children$[0].$children$[1];
      expect(fourthChild.$attrs$.class).toBe('top-level');
      expect(fourthChild.$children$[0].$attrs$.automationId).toBe(giveNav.children[2][1]['automation-id']);
      expect(fourthChild.$children$[0].$attrs$.href).toBe(giveNav.children[2][1]['href']);
      expect(fourthChild.$children$[0].$children$[0].$text$).toBe(giveNav.children[2][1]['title']);

      const fifthChild = rendered.$children$[0].$children$[4].$children$[0].$children$[0];
      expect(fifthChild.$attrs$.class).toBe('top-level');
      expect(fifthChild.$children$[0].$attrs$.automationId).toBe(giveNav.children[3][0]['automation-id']);
      expect(fifthChild.$children$[0].$attrs$.href).toBe(giveNav.children[3][0]['href']);
      expect(fifthChild.$children$[0].$children$[0].$text$).toBe(giveNav.children[3][0]['title']);

      const sixthChild = rendered.$children$[0].$children$[4].$children$[0].$children$[1];
      expect(sixthChild.$attrs$.class).toBe('');
      expect(sixthChild.$children$[0].$attrs$.automationId).toBe(giveNav.children[3][1]['automation-id']);
      expect(sixthChild.$children$[0].$attrs$.href).toBe(giveNav.children[3][1]['href']);
      expect(sixthChild.$children$[0].$children$[0].$text$).toBe(giveNav.children[3][1]['title']);
    });
  });
});
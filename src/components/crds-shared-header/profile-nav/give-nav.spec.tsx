import { GiveMenu } from "./give-nav";

const payload = {
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

  describe('Tests maybeRenderListEntry()', () => {
    const invalidData = [[], null, undefined, false, "string"];
    invalidData.forEach(badValue => {
      it(`Checks nothing is returned if given invalid value "${badValue}"`, () => {
        const rendered = this.component.maybeRenderListEntry(badValue, true);

        expect(rendered).toBeFalsy();
      });
    });

    it('Checks list entry returned', () => {
      const data = {
        "title": "Many more test questions",
        "href": "https://int.crossroads.net/giving/#others",
        "automation-id": "sh-other-ways"
      };

      const rendered = this.component.maybeRenderListEntry(data, true);

      expect(rendered.$tag$).toBe('li');
      expect(rendered.$attrs$.class).toBe('top-level');
      expect(rendered.$children$[0].$attrs$['data-automation-id']).toBe(data['automation-id']);
      expect(rendered.$children$[0].$attrs$.href).toBe(data.href);
      expect(rendered.$children$[0].$children$[0].$text$).toBe(data.title);
    });

    it('Checks class is top_level if data.top_level is true, overriding given value', () => {
      const data = {
        "title": "Many more test questions",
        "href": "https://int.crossroads.net/giving/#others",
        "top_level": true,
        "automation-id": "sh-other-ways"
      };

      const rendered = this.component.maybeRenderListEntry(data, false);

      expect(rendered.$attrs$.class).toBe('top-level');
    });

    it('Checks class is top_level if data.top_level is false, overriding given value', () => {
      const data = {
        "title": "Many more test questions",
        "href": "https://int.crossroads.net/giving/#others",
        "top_level": false,
        "automation-id": "sh-other-ways"
      };

      const rendered = this.component.maybeRenderListEntry(data, true);

      expect(rendered.$attrs$.class).toBe('');
    });

    const nonBooleans = [undefined, null, "string", {}, []];
    nonBooleans.forEach(badValue => {
      it(`Checks given top level value is used if data.top_level is non-boolean value "${badValue}"`, () => {
        const data = {
          "title": "Many more test questions",
          "href": "https://int.crossroads.net/giving/#others",
          "top_level": badValue,
          "automation-id": "sh-other-ways"
        };

        const renderedGivenTrue = this.component.maybeRenderListEntry(data, true);
        expect(renderedGivenTrue.$attrs$.class).toBe('top-level');

        const renderedGivenFalse = this.component.maybeRenderListEntry(data, false);
        expect(renderedGivenFalse.$attrs$.class).toBe('');
      });
    });
  });

  describe('Tests maybeRenderList()', () => {
    const nonArrays = [{}, "string", null, undefined, false];
    nonArrays.forEach(badValue => {
      it(`Checks false is returned if given non-array with value "${badValue}"`, () => {
        const rendered = this.component.maybeRenderList(badValue, true);

        expect(rendered).toBeFalsy();
      });
    });

    it('Checks falsy is returned if given array with invalid contents', () => {
      const badList = ["string", null, []]

      const rendered = this.component.maybeRenderList(badList, true);

      expect(rendered).toBeFalsy();
    });

    it('Checks falsy is returned if given empty array', () => {
      const anArray = [];

      const rendered = this.component.maybeRenderList(anArray, true);

      expect(rendered).toBeFalsy();
    });
  });

  describe('Tests renderSections()', () => {
    it('Checks element has title', () => {
      const emptyPayload = {
        "title": "Give",
        "children": []
      };
      const rendered = this.component.renderSections(emptyPayload);

      expect(rendered.$children$[0].$children$[0].$text$).toMatch(/\W?Give\W?/);
    });

    it('Checks element has no sub-elements if payload has no children', () => {
      const emptyChildren = {
        "title": "Give",
        "children": []
      };

      const rendered = this.component.renderSections(emptyChildren);

      expect(rendered.$children$).toHaveLength(1); //Only title should render
    });

    it('Checks element has no sub-elements if payload has no children property', () => {
      const noChildren = {
        "title": "Give"
      };

      const rendered = this.component.renderSections(noChildren);

      expect(rendered.$children$).toHaveLength(1); //Only title should render
    });

    it('Checks sub header rendered', () => {
      const stringChildren = {
        "title": "Give",
        "children": [
          "My Giving"
        ]
      };

      const rendered = this.component.renderSections(stringChildren);

      expect(rendered.$children$[1].$children$[0].$children$[0].$text$).toBe(stringChildren.children[0]);
    });

    describe('Tests top_level set in class correctly', () => {
      it('Checks subHeader list elements with top_level property are top level', () => {
        const objectChildren = {
          "background_img": "https://crds-media.imgix.net/6sNxa1MWhMOfjhAB47yTCa/0acf1af4109f23abc0199b1e34abeb7a/give-bg_2x.jpg?auto=format%2Ccompress",
          "title": "Give",
          "children": [
            "SubHeader",
            [
              {
                "title": "Give now",
                "href": "https://sandbox.pushpay.io/g/crossroadscincinnati",
                "top_level": true,
                "automation-id": "sh-give-now"
              },
              {
                "title": "My giving",
                "href": "https://int.crossroads.net/me/giving",
                "automation-id": "sh-my-giving"
              }
            ]
          ]
        };

        const rendered = this.component.renderSections(objectChildren);

        const firstChild = rendered.$children$[2].$children$[0].$children$[0];
        expect(firstChild.$attrs$.class).toBe('top-level');
        expect(firstChild.$children$[0].$attrs$['data-automation-id']).toBe(objectChildren.children[1][0]['automation-id']);
        expect(firstChild.$children$[0].$attrs$.href).toBe(objectChildren.children[1][0].href);
        expect(firstChild.$children$[0].$children$[0].$text$).toBe(objectChildren.children[1][0].title);

        const secondChild = rendered.$children$[2].$children$[0].$children$[1];
        expect(secondChild.$attrs$.class).toBe('');
        expect(secondChild.$children$[0].$attrs$['data-automation-id']).toBe(objectChildren.children[1][1]['automation-id']);
        expect(secondChild.$children$[0].$attrs$.href).toBe(objectChildren.children[1][1].href);
        expect(secondChild.$children$[0].$children$[0].$text$).toBe(objectChildren.children[1][1].title);
      });

      it('Checks non-subHeader list elements are top level', () => {
        const objectChildren = {
          "background_img": "https://crds-media.imgix.net/6sNxa1MWhMOfjhAB47yTCa/0acf1af4109f23abc0199b1e34abeb7a/give-bg_2x.jpg?auto=format%2Ccompress",
          "title": "Give",
          "children": [
            [
              {
                "title": "Give now",
                "href": "https://sandbox.pushpay.io/g/crossroadscincinnati",
                "automation-id": "sh-give-now"
              },
              {
                "title": "My giving",
                "href": "https://int.crossroads.net/me/giving",
                "automation-id": "sh-my-giving"
              }
            ]
          ]
        };

        const rendered = this.component.renderSections(objectChildren);

        const firstChild = rendered.$children$[1].$children$[0].$children$[0];
        expect(firstChild.$attrs$.class).toBe('top-level');
        expect(firstChild.$children$[0].$attrs$['data-automation-id']).toBe(objectChildren.children[0][0]['automation-id']);

        const secondChild = rendered.$children$[1].$children$[0].$children$[1];
        expect(secondChild.$attrs$.class).toBe('top-level');
        expect(secondChild.$children$[0].$attrs$['data-automation-id']).toBe(objectChildren.children[0][1]['automation-id']);
      });

      it('Checks non-subHeader list elements are not top level if their top_level property is false', () => {
        const objectChildren = {
          "background_img": "https://crds-media.imgix.net/6sNxa1MWhMOfjhAB47yTCa/0acf1af4109f23abc0199b1e34abeb7a/give-bg_2x.jpg?auto=format%2Ccompress",
          "title": "Give",
          "children": [
            [
              {
                "title": "Give now",
                "href": "https://sandbox.pushpay.io/g/crossroadscincinnati",
                "top_level": false,
                "automation-id": "sh-give-now"
              },
              {
                "title": "My giving",
                "href": "https://int.crossroads.net/me/giving",
                "top_level": null, //Value must be boolean to be applied
                "automation-id": "sh-my-giving"
              }
            ]
          ]
        };

        const rendered = this.component.renderSections(objectChildren);

        const firstChild = rendered.$children$[1].$children$[0].$children$[0];
        expect(firstChild.$attrs$.class).toBe('');
        expect(firstChild.$children$[0].$attrs$['data-automation-id']).toBe(objectChildren.children[0][0]['automation-id']);

        const secondChild = rendered.$children$[1].$children$[0].$children$[1];
        expect(secondChild.$attrs$.class).toBe('top-level');
        expect(secondChild.$children$[0].$attrs$['data-automation-id']).toBe(objectChildren.children[0][1]['automation-id']);
      });
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
      this.component.data = payload;

      const rendered = this.component.render();

      expect(rendered.$attrs$.class).toBe('give-nav');
    });

    it('Checks background_image can be undefined', () => {
      this.component.data = {
        "title": "Give test",
        "children": []
      };

      const render = this.component.render();

      expect(render.$attrs$.style.backgroundImage).toBe('url(undefined)');
    });

    it('Checks give nav contains all expected child elements', () => {
      this.component.data = payload;

      const rendered = this.component.render();

      expect(rendered.$children$[0].$children$).toHaveLength(5);

      const sectionTitle = rendered.$children$[0].$children$[0].$children$[0];
      expect(sectionTitle.$text$).toMatch(/\W?Give\W?/);

      const firstChid = rendered.$children$[0].$children$[1].$children$[0].$children$[0];
      expect(firstChid.$attrs$.class).toBe('top-level');
      expect(firstChid.$children$[0].$attrs$['data-automation-id']).toBe(payload.children[0][0]['automation-id']);
      expect(firstChid.$children$[0].$attrs$.href).toBe(payload.children[0][0]['href']);
      expect(firstChid.$children$[0].$children$[0].$text$).toBe(payload.children[0][0]['title']);

      const secondChild = rendered.$children$[0].$children$[2].$children$[0];
      expect(secondChild.$children$[0].$text$).toBe(payload.children[1]);
      expect(secondChild.$tag$).toBe('h4');

      const thirdChild = rendered.$children$[0].$children$[3].$children$[0].$children$[0];
      expect(thirdChild.$attrs$.class).toBe('');
      expect(thirdChild.$children$[0].$attrs$['data-automation-id']).toBe(payload.children[2][0]['automation-id']);
      expect(thirdChild.$children$[0].$attrs$.href).toBe(payload.children[2][0]['href']);
      expect(thirdChild.$children$[0].$children$[0].$text$).toBe(payload.children[2][0]['title']);

      const fourthChild = rendered.$children$[0].$children$[3].$children$[0].$children$[1];
      expect(fourthChild.$attrs$.class).toBe('top-level');
      expect(fourthChild.$children$[0].$attrs$['data-automation-id']).toBe(payload.children[2][1]['automation-id']);
      expect(fourthChild.$children$[0].$attrs$.href).toBe(payload.children[2][1]['href']);
      expect(fourthChild.$children$[0].$children$[0].$text$).toBe(payload.children[2][1]['title']);

      const fifthChild = rendered.$children$[0].$children$[4].$children$[0].$children$[0];
      expect(fifthChild.$attrs$.class).toBe('top-level');
      expect(fifthChild.$children$[0].$attrs$['data-automation-id']).toBe(payload.children[3][0]['automation-id']);
      expect(fifthChild.$children$[0].$attrs$.href).toBe(payload.children[3][0]['href']);
      expect(fifthChild.$children$[0].$children$[0].$text$).toBe(payload.children[3][0]['title']);

      const sixthChild = rendered.$children$[0].$children$[4].$children$[0].$children$[1];
      expect(sixthChild.$attrs$.class).toBe('');
      expect(sixthChild.$children$[0].$attrs$['data-automation-id']).toBe(payload.children[3][1]['automation-id']);
      expect(sixthChild.$children$[0].$attrs$.href).toBe(payload.children[3][1]['href']);
      expect(sixthChild.$children$[0].$children$[0].$text$).toBe(payload.children[3][1]['title']);
    });
  });
});
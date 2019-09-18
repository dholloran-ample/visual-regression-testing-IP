import { SimpleNavHelper } from "./simple-nav-helper";

describe('simple-nav-helper', () => {
  beforeEach(() => {
    this.helper = new SimpleNavHelper();
  });

  describe('Tests renderNav()', () => {
    it('Checks element has title', () => {
      const emptyPayload = {
        "title": "Give",
        "children": []
      };
      const rendered = this.helper.renderNav(emptyPayload, emptyPayload.title);

      expect(rendered.$children$[0].$children$[0].$text$).toMatch(/\W?Give\W?/);
    });

    const invalidChildren = ['string', [], {}, null, undefined]
    invalidChildren.forEach(badChild => {
      it(`Checks element has no sub-elements if payload has invalid child property "${badChild}"`, () => {
        const children = {
          "title": "Give Cookies",
          "children": badChild
        };

        const rendered = this.helper.renderNav(children, children.title);

        expect(rendered.$children$).toHaveLength(1); //Only title should render
        expect(rendered.$children$[0].$children$[0].$text$).toMatch(/\W?Give Cookies\W?/);
      });
    });

    it('Checks element has no sub-elements if payload has no children property', () => {
      const noChildren = {
        "title": "Give Children"
      };

      const rendered = this.helper.renderNav(noChildren, noChildren.title);

      expect(rendered.$children$).toHaveLength(1); //Only title should render
      expect(rendered.$children$[0].$children$[0].$text$).toMatch(/\W?Give Children\W?/);
    });

    it('Checks element has header tags even if missing title', () => {
      const missingTitle = {
        "children": ['subHeader']
      };
      const rendered = this.helper.renderNav(missingTitle, missingTitle['title']);

      expect(rendered.$children$[0].$children$).toBeNull();
      expect(rendered.$children$[0].$tag$).toBe('h2');
      expect(rendered.$children$[1].$tag$).toBe('div');
    });
  });

  describe('Tests maybeRenderNavEntries()', () => {
    const nonArrays = ['string', {}, null, undefined]
    nonArrays.forEach(badData => {
      it(`Checks falsy is returned if given non-array "${badData}"`, () => {
        const rendered = this.helper.maybeRenderNavEntries(badData);

        expect(rendered).toBeFalsy();
      });
    });

    it(`Checks falsy is returned if given empty array`, () => {
      const rendered = this.helper.maybeRenderNavEntries([]);

      expect(rendered).toBeFalsy();
    });


    describe('Tests top_level set in class correctly', () => {
      it('Checks subHeader list elements with top_level property are top level', () => {
        const objectChildren = [
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
          ];

        const rendered = this.helper.maybeRenderNavEntries(objectChildren);

        const firstChild = rendered[0].$children$[0];
        expect(firstChild.$children$[0].$text$).toBe(objectChildren[0]);
        expect(firstChild.$tag$).toBe('h4');

        const secondChild = rendered[1].$children$[0].$children$[0];
        expect(secondChild.$attrs$.class).toBe('top-level');
        expect(secondChild.$children$[0].$attrs$.automationId).toBe(objectChildren[1][0]['automation-id']);
        expect(secondChild.$children$[0].$attrs$.href).toBe(objectChildren[1][0].href);
        expect(secondChild.$children$[0].$children$[0].$text$).toBe(objectChildren[1][0].title);

        const thirdChild = rendered[1].$children$[0].$children$[1];
        expect(thirdChild.$attrs$.class).toBe('');
        expect(thirdChild.$children$[0].$attrs$.automationId).toBe(objectChildren[1][1]['automation-id']);
        expect(thirdChild.$children$[0].$attrs$.href).toBe(objectChildren[1][1].href);
        expect(thirdChild.$children$[0].$children$[0].$text$).toBe(objectChildren[1][1].title);
      });

      it('Checks non-subHeader list elements are top level', () => {
        const objectChildren = [
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
          ];

        const rendered = this.helper.maybeRenderNavEntries(objectChildren);

        const firstChild = rendered[0].$children$[0].$children$[0];
        expect(firstChild.$attrs$.class).toBe('top-level');
        expect(firstChild.$children$[0].$attrs$.automationId).toBe(objectChildren[0][0]['automation-id']);

        const secondChild = rendered[0].$children$[0].$children$[1];
        expect(secondChild.$attrs$.class).toBe('top-level');
        expect(secondChild.$children$[0].$attrs$.automationId).toBe(objectChildren[0][1]['automation-id']);
      });

      it('Checks non-subHeader list elements are not top level if their top_level property is false', () => {
        const objectChildren = [
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
          ];

        const rendered = this.helper.maybeRenderNavEntries(objectChildren);

        const firstChild = rendered[0].$children$[0].$children$[0];
        expect(firstChild.$attrs$.class).toBe('');
        expect(firstChild.$children$[0].$attrs$.automationId).toBe(objectChildren[0][0]['automation-id']);

        const secondChild = rendered[0].$children$[0].$children$[1];
        expect(secondChild.$attrs$.class).toBe('top-level');
        expect(secondChild.$children$[0].$attrs$.automationId).toBe(objectChildren[0][1]['automation-id']);
      });
    });
  });

  describe('Tests formatMenuTitle()', () => {
    it('Checks the title is returned formatted', () => {
      const rendered = this.helper.formatMenuTitle('some title');

      expect(rendered.$children$[0].$text$).toBe('some title')
      expect(rendered.$tag$).toBe('h2')
    });

    const nonStrings = [undefined, {}, null, 1, []];
    nonStrings.forEach(badTitle => {
      it(`Checks non-string title "${badTitle}" does not error`, () => {
        const rendered = this.helper.formatMenuTitle(badTitle);

        expect(rendered.$tag$).toBe('h2')
      });
    });
  });

  describe('Tests formatMenuEntry()', () => {
    it('Checks the element is returned formatted', () => {
      const rendered = this.helper.formatMenuEntry('fake entry');

      expect(rendered.$attrs$.style.padding).toBe('0');
      expect(rendered.$children$[0].$text$).toBe('fake entry');
      expect(rendered.$tag$).toBe('div')
    });
  });

  describe('Tests formatSubHeader()', () => {
    it('Checks the header is returned formatted', () => {
      const rendered = this.helper.formatSubHeader('subHeader');

      expect(rendered.$children$[0].$text$).toBe('subHeader')
      expect(rendered.$tag$).toBe('h4')
    });

    const nonStrings = [undefined, {}, null, 1, []];
    nonStrings.forEach(badHeader => {
      it(`Checks non-string header "${badHeader}" does not error`, () => {
        const rendered = this.helper.formatSubHeader(badHeader);

        expect(rendered.$tag$).toBe('h4')
      });
    });
  });

  describe('Tests formatList()', () => {
    it('Checks the element is returned formatted', () => {
      const rendered = this.helper.formatList('fake list');

      expect(rendered.$children$[0].$text$).toBe('fake list');
      expect(rendered.$tag$).toBe('ul')
    });
  });

  describe('Tests formatListEntry()', () => {
    it('Checks list entry returned formatted', () => {
      const data = {
        "title": "Many more test questions",
        "href": "https://int.crossroads.net/giving/#others",
        "automation-id": "sh-other-ways"
      };

      const rendered = this.helper.formatListEntry(data, 'some class value');

      expect(rendered.$tag$).toBe('li');
      expect(rendered.$attrs$.class).toBe('some class value');

      expect(rendered.$children$[0].$tag$).toBe('nav-link');
      expect(rendered.$children$[0].$attrs$.automationId).toBe(data['automation-id']);
      expect(rendered.$children$[0].$attrs$.href).toBe(data.href);
      expect(rendered.$children$[0].$children$[0].$text$).toBe(data.title);
    });
  });

  describe('Tests maybeRenderList()', () => {
    const nonArrays = [{}, "string", null, undefined, false];
    nonArrays.forEach(badList => {
      it(`Checks falsy is returned if given non-array with value "${badList}"`, () => {
        const rendered = this.helper.maybeRenderList(badList, true);

        expect(rendered).toBeFalsy();
      });
    });

    it('Checks falsy is returned if given empty array', () => {
      const anArray = [];

      const rendered = this.helper.maybeRenderList(anArray, true);

      expect(rendered).toBeFalsy();
    });

    it('Checks list returned', () => {
      const data =  [
        {
          "title": "Why give?",
          "href": "https://int.crossroads.net/giving",
          "automation-id": "sh-why-give"
        },
        {
          "title": "Other ways to give",
          "href": "https://int.crossroads.net/giving/#others",
          "automation-id": "sh-other-ways"
        }
      ]

      const rendered = this.helper.maybeRenderList(data, true);

      expect(rendered.$tag$).toBe('ul');
      expect(rendered.$children$).toHaveLength(2);
      expect(rendered.$children$[0].$children$[0].$attrs$.automationId).toBe(data[0]["automation-id"]);
      expect(rendered.$children$[1].$children$[0].$attrs$.automationId).toBe(data[1]["automation-id"]);
    });
  });


  describe('Tests maybeRenderListEntry()', () => {
    const invalidData = [[], null, undefined, false, "string"];
    invalidData.forEach(badValue => {
      it(`Checks falsy is returned if given invalid value "${badValue}"`, () => {
        const rendered = this.helper.maybeRenderListEntry(badValue, true);

        expect(rendered).toBeFalsy();
      });
    });

    it('Checks list entry returned', () => {
      const data = {
        "title": "Many more test questions",
        "href": "https://int.crossroads.net/giving/#others",
        "automation-id": "sh-other-ways"
      };

      const rendered = this.helper.maybeRenderListEntry(data, true);

      expect(rendered.$tag$).toBe('li');
      expect(rendered.$attrs$.class).toBe('top-level');
      expect(rendered.$children$[0].$attrs$.automationId).toBe(data['automation-id']);
      expect(rendered.$children$[0].$attrs$.href).toBe(data.href);
      expect(rendered.$children$[0].$children$[0].$text$).toBe(data.title);
    });

    it('Checks if class is top_level based on data.top_level value, overriding given value', () => {
      const data = {
        "title": "Many more test questions",
        "href": "https://int.crossroads.net/giving/#others",
        "top_level": true,
        "automation-id": "sh-other-ways"
      };

      const renderedGivenFalse = this.helper.maybeRenderListEntry(data, false);

      expect(renderedGivenFalse.$attrs$.class).toBe('top-level');
      expect(renderedGivenFalse.$children$[0].$tag$).toBe('nav-link');
      expect(renderedGivenFalse.$children$[0].$attrs$.automationId).toBe(data['automation-id']);
      expect(renderedGivenFalse.$children$[0].$attrs$.href).toBe(data.href);
      expect(renderedGivenFalse.$children$[0].$children$[0].$text$).toBe(data.title);

      data.top_level = false;
      const renderedGivenTrue = this.helper.maybeRenderListEntry(data, true);

      expect(renderedGivenTrue.$attrs$.class).toBe('');
      expect(renderedGivenFalse.$children$[0].$tag$).toBe('nav-link');
      expect(renderedGivenTrue.$children$[0].$attrs$.automationId).toBe(data['automation-id']);
      expect(renderedGivenTrue.$children$[0].$attrs$.href).toBe(data.href);
      expect(renderedGivenTrue.$children$[0].$children$[0].$text$).toBe(data.title);
    });

    it(`Checks given top level value is used if data.top_level is undefined`, () => {
      const data = {
        "title": "Many more test questions",
        "href": "https://int.crossroads.net/giving/#others",
        "automation-id": "sh-other-ways"
      };

      const renderedGivenTrue = this.helper.maybeRenderListEntry(data, true);
      expect(renderedGivenTrue.$attrs$.class).toBe('top-level');

      const renderedGivenFalse = this.helper.maybeRenderListEntry(data, false);
      expect(renderedGivenFalse.$attrs$.class).toBe('');
    });
  });

  describe('Tests topLevelClassValue()', () => {
    [true, false].forEach(propValue => {
      it(`Checks data.top_level value decides 'top-level' class value if boolean`, () => {
        const data = {
          "top_level": propValue
        };
        const calculatedTopLevel = !propValue;

        const className = this.helper.topLevelClassValue(data, calculatedTopLevel);

        expect(className).toBe(propValue ? 'top-level' : '');
      });
    });

    const nonBooleans = [undefined, null, "string", {}, []];
    nonBooleans.forEach(badValue => {
      it(`Checks given top-level value is used if data.top_level is non-boolean value "${badValue}"`, () => {
        const data = {
          "top_level": badValue
        };

        const classNameGivenTrue = this.helper.topLevelClassValue(data, true);
        expect(classNameGivenTrue).toBe('top-level');

        const classNameGivenFalse = this.helper.topLevelClassValue(data, false);
        expect(classNameGivenFalse).toBe('');
      });
    });
  });

  describe('Tests isObjectTruthyNonArray()', () => {
    const trueObjects = [{}, {a:1}];
    trueObjects.forEach(truthyObject => {
      it(`Checks true is returned given "${truthyObject}"`, () => {
        const result = this.helper.isObjectTruthyNonArray(truthyObject);

        expect(result).toBe(true);
      });
    });

    const falseObjects = [[], 'string', null, undefined, 1];
    falseObjects.forEach(falsyObject => {
      it(`Checks falsy is returned given "${falsyObject}"`, () => {
        const result = this.helper.isObjectTruthyNonArray(falsyObject);

        expect(result).toBeFalsy();
      });
    });
  });
});
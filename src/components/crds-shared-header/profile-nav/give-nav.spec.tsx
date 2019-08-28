import { GiveMenu } from "./give-nav";
import { jsxElement } from "@babel/types";

const payload = {
  "background_img": "https://crds-media.imgix.net/6sNxa1MWhMOfjhAB47yTCa/0acf1af4109f23abc0199b1e34abeb7a/give-bg_2x.jpg?auto=format%2Ccompress",
  "title": "Give",
  "children": [
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
        "top_level": true,
        "automation-id": "sh-my-giving"
      }
    ],
    "About giving"
  ]
}

describe('<give-nav>', () => {
  beforeEach(() => {
    this.component = new GiveMenu();
  });

  describe('Tests renderSections()', () => {
    it('Checks element has title', () => {
      const rendered = this.component.renderSections(payload);

      expect(rendered.$children$[0].$children$[0].$text$).toMatch(/\W?Give\W?/);
      expect(rendered.$children$).toHaveLength(3);
    });

    it('Checks element has no sub-elements if payload has no children', () => {
      const noChildren = {
          "background_img": "https://crds-media.imgix.net/6sNxa1MWhMOfjhAB47yTCa/0acf1af4109f23abc0199b1e34abeb7a/give-bg_2x.jpg?auto=format%2Ccompress",
          "title": "Give",
          "children": []
        };

      const rendered = this.component.renderSections(noChildren);

      expect(rendered.$children$).toHaveLength(1);
    });

    it('Checks element has expected sub-element if payload only has object children', () => {
      const objectChildren = {
          "background_img": "https://crds-media.imgix.net/6sNxa1MWhMOfjhAB47yTCa/0acf1af4109f23abc0199b1e34abeb7a/give-bg_2x.jpg?auto=format%2Ccompress",
          "title": "Give",
          "children": [
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
                "top_level": false, //TODO this means nothing.
                "automation-id": "sh-my-giving"
              }
            ]
          ]
        };

      const rendered = this.component.renderSections(objectChildren);

      [0,1].forEach(elementIndex => {
        expect(rendered.$children$[1].$children$[0].$children$[elementIndex].$attrs$.class).toBe('top-level');
        expect(rendered.$children$[1].$children$[0].$children$[elementIndex].$children$[0].$attrs$['data-automation-id']).toBe(objectChildren.children[0][elementIndex]['automation-id']);
        expect(rendered.$children$[1].$children$[0].$children$[elementIndex].$children$[0].$attrs$.href).toBe(objectChildren.children[0][elementIndex].href);
        expect(rendered.$children$[1].$children$[0].$children$[elementIndex].$children$[0].$children$[0].$text$).toBe(objectChildren.children[0][elementIndex].title);
      });
    });

    it('Checks element has expected sub-element if payload only has string children', () => {
      const stringChildren = {
          "background_img": "https://crds-media.imgix.net/6sNxa1MWhMOfjhAB47yTCa/0acf1af4109f23abc0199b1e34abeb7a/give-bg_2x.jpg?auto=format%2Ccompress",
          "title": "Give",
          "children": [
            "My Giving"
          ]
        };

      const rendered = this.component.renderSections(stringChildren);

      expect(rendered.$children$[1].$children$[0].$children$[0].$text$).toBe(stringChildren.children[0]);
    });

    it('Checks element has expected sub-elements if payload has string and object children', () => {
      const rendered = this.component.renderSections(payload);

      [0,1].forEach(elementIndex => {
        expect(rendered.$children$[1].$children$[0].$children$[elementIndex].$attrs$.class).toBe('top-level');
        expect(rendered.$children$[1].$children$[0].$children$[elementIndex].$children$[0].$attrs$['data-automation-id']).toBe(payload.children[0][elementIndex]['automation-id']);
        expect(rendered.$children$[1].$children$[0].$children$[elementIndex].$children$[0].$attrs$.href).toBe(payload.children[0][elementIndex]['href']);
        expect(rendered.$children$[1].$children$[0].$children$[elementIndex].$children$[0].$children$[0].$text$).toBe(payload.children[0][elementIndex]['title']);
      });

      expect(rendered.$children$[2].$children$[0].$children$[0].$text$).toBe(payload.children[1]);
    });
  });

  describe('Tests render()', () => {
    it('Checks null is returned if profile nav is not showing', () => {
      this.component.giveNavIsShowing = false;

      const rendered = this.component.render();

      expect(rendered).toBeNull();
    });

    it('Checks give nav element is returned', () => {
      this.component.data = payload;

      const rendered = this.component.render();

      expect(rendered.$attrs$.class).toBe('give-nav');
    });

    it('Checks give nav contains expected child elements in order', () => {
      this.component.data = payload;

      const rendered = this.component.render();

      expect(rendered.$children$[0].$children$[0].$children$[0].$text$).toMatch(/\W?Give\W?/);
      expect(rendered.$children$[0].$children$).toHaveLength(3);

      [0,1].forEach(elementIndex => {
        expect(rendered.$children$[0].$children$[1].$children$[0].$children$[elementIndex].$attrs$.class).toBe('top-level');
        expect(rendered.$children$[0].$children$[1].$children$[0].$children$[elementIndex].$children$[0].$attrs$['data-automation-id']).toBe(payload.children[0][elementIndex]['automation-id']);
        expect(rendered.$children$[0].$children$[1].$children$[0].$children$[elementIndex].$children$[0].$attrs$.href).toBe(payload.children[0][elementIndex]['href']);
        expect(rendered.$children$[0].$children$[1].$children$[0].$children$[elementIndex].$children$[0].$children$[0].$text$).toBe(payload.children[0][elementIndex]['title']);
      });

      expect(rendered.$children$[0].$children$[2].$children$[0].$children$[0].$text$).toBe(payload.children[1]);
    });

    it('Checks an error is thrown if background_image is not defined', () => {
      expect(() => this.component.render()).toThrow();
    });
  });
});
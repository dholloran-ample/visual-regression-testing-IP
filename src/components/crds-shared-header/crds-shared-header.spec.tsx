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
});
import { SharedHeader } from "./crds-shared-header";

describe('<crds-shared-header>', () => {
  beforeEach(() => {
    this.component = new SharedHeader();
    this.component.env = 'int';
  });

  describe('Tests componentWillLoad()', () => {
    it('Checks data is retrieved', async () => {
      expect(this.component.data).toEqual({});

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
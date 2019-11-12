import { CrdsVideo } from "./crds-video";

describe('<crds-video>', () => {
  beforeEach(() => {
    this.component = new CrdsVideo();
  });

  describe('Tests componentDidLoad()', () => {
    it('Checks element is required', () => {
      expect(() => this.component.componentDidLoad()).toThrow();
    });
  });
});

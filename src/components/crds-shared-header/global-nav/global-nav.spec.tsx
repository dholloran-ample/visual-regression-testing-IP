import { GlobalNav } from './global-nav';

describe('<global-nav>', () => {
  beforeEach(() => {
    this.component = new GlobalNav();
    this.component.env = 'int';
  });

  it('should return root URL', () => {
    expect(this.component.rootURL()).toBe('https://int.crossroads.net');
  });
});

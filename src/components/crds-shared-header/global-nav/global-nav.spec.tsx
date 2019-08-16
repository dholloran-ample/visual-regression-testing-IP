import { GlobalNav } from './global-nav';

describe('<global-nav>', () => {
  beforeEach(() => {
    this.component = new GlobalNav();
    this.component.env = 'int';
  });

  it('should return root URL', () => {
    expect(this.component.rootURL()).toBe('https://int.crossroads.net');
  });

  it('should redirect users following signout', () => {
    this.component.auth = {
      signOut: jest.fn()
    };
    const redirectToRoot = (this.component.redirectToRoot = jest.fn());
    this.component.authChangeCallback();
    expect(redirectToRoot).toBeCalled();
  });
});

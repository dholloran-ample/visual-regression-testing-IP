import { ProfileMenu } from "./profile-nav";

const profileNav = {
  title: "Hello %user_name%",
  children: [
    [
      {
        "title": "My profile",
        "automation-id": "sh-my-profile",
        "href": "https://int.crossroads.net/profile/personal"
      },
      {
        "title": "My Giving",
        "automation-id": "sh-giving",
        "href": "https://int.crossroads.net/me/giving"
      },
      {
        "title": "Sign out",
        "automation-id": "sh-sign-out",
        "href": "https://int.crossroads.net/signout"
      }
    ],
    "Get Involved"
  ]
}

describe('<profile-nav>', () => {
  beforeEach(() => {
    this.component = new ProfileMenu();
  });

  describe('Tests navTitle()', () => {
    it("Checks the user's name is included in the menu title if the user's name is defined", () => {
      this.component.data = profileNav;
      this.component.currentUser = { name: 'Benjamin'}

      const title = this.component.navTitle();

      expect(title).toMatch(/\W?Hello Benjamin\W?/);
    });

    it("Checks the menu title does not include the user's name if undefined", () => {
      this.component.data = profileNav;
      this.component.currentUser = {};

      const title = this.component.navTitle();

      expect(title).toMatch(/\W?Hello\W?/);
    });

    it(`Checks menu title is an empty string if nav object does not contain a title property`, () => {
      this.component.data = {
        children: [
          "Get Involved"
        ]
      }
      this.component.currentUser = {name: 'Benjamin'};

      const title = this.component.navTitle();

      expect(title).toBe('');
    });
  });

  describe('Tests backgroundImageURL()', () => {
    it("Checks empty string is returned by backgroundImageURL if currentUser is undefined", () => {
      this.component.currentUser = undefined;

      const image = this.component.backgroundImageURL();

      expect(image).toBe('');
    });

    it("Checks empty string is returned by backgroundImageURL if currentUser.avatarUrl is undefined", () => {
      this.component.currentUser = {};

      const image = this.component.backgroundImageURL();

      expect(image).toBe('');
    });

    it("Checks avatarUrl is returned by backgroundImageURL if currentUser.avatarUrl is defined", () => {
      this.component.currentUser = { avatarUrl: 'int.crossroads.com/profile'};

      const image = this.component.backgroundImageURL();

      expect(image).toBe('int.crossroads.com/profile');
    });
  });

  describe('Tests render()', () => {
    it('Checks null is returned if profile nav is not showing', () => {
      this.component.profileNavIsShowing = false;

      const rendered = this.component.render();

      expect(rendered).toBeNull();
    });

    const invalidData = [undefined, [], true, false, "String", null];
    invalidData.forEach(badValue => {
      it(`Checks null is returned if give component's data is "${badValue}"`, () => {
        this.component.profileNavIsShowing = true;
        this.component.data = badValue;

        const rendered = this.component.render();

        expect(rendered).toBeNull();
      });
    });

    it('Checks profile nav element is returned', () => {
      this.component.profileNavIsShowing = true;
      this.component.currentUser = { avatarUrl: 'https://int.crossroads.net/proxy/gateway/api/image/profile/7772248' };
      this.component.data = profileNav;

      const rendered = this.component.render();

      expect(rendered.$attrs$.class).toBe('profile-nav');
    });

    it('Checks profile nav contains user avatar', () => {
      this.component.profileNavIsShowing = true;
      this.component.currentUser = { avatarUrl: 'https://int.crossroads.net/proxy/gateway/api/image/profile/7772248' };
      this.component.data = profileNav;

      const rendered = this.component.render();
      const renderedNavImage = rendered.$children$[0].$attrs$;

      expect(renderedNavImage.class).toBe('profile-nav-img');
      expect(renderedNavImage.style.backgroundImage).toMatch(/.*url\('https:\/\/int.crossroads.net\/proxy\/gateway\/api\/image\/profile\/7772248'\).*/);
    });

    it('Checks profile nav contains expected child elements in order', () => {
      this.component.profileNavIsShowing = true;
      this.component.currentUser = { name: 'Ben', avatarUrl: 'fakeUrl' };
      this.component.data = profileNav;

      const rendered = this.component.render();

      expect(rendered.$children$).toHaveLength(2);

      expect(rendered.$children$[0].$attrs$.class).toBe('profile-nav-img');

      const renderedName = rendered.$children$[1].$children$[0].$children$[0];
      expect(renderedName.$children$[0].$text$).toMatch(/\W?Hello Ben\W?/);

      const renderedNavLinks = rendered.$children$[1].$children$[0].$children$[1].$children$[0].$children$;

      [0,1,2].forEach(navLinkIndex => {
        expect(renderedNavLinks[navLinkIndex].$children$[0].$tag$).toEqual('nav-link')
        expect(renderedNavLinks[navLinkIndex].$children$[0].$attrs$.automationId).toBe(profileNav.children[0][navLinkIndex]['automation-id']);
      })

      const renderedHeader = rendered.$children$[1].$children$[0].$children$[2];
      expect(renderedHeader.$children$[0].$children$[0].$text$).toEqual(profileNav.children[1]);
    });
  });
});
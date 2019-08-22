import { ProfileMenu } from "./profile-nav";

const payload = {
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

const stringPayload = {
  title: "Hello %user_name%",
  children: [
    "Get Involved"
  ]
}

describe('<profile-nav>', () => {
  beforeEach(() => {
    this.component = new ProfileMenu();
  });

  describe('Tests handleClick()', () => {
    beforeEach(() => {
      this.fakeEvent = {
        preventDefault: jest.fn()
      };
    });

    it('Checks signout method called if element is for signing out', () => {
      this.component.onSignOut = jest.fn();

      this.component.handleClick(this.fakeEvent);

      expect(this.component.onSignOut).toBeCalledTimes(1);
    });

    it('Checks signout method called if element is not for signing out', () => {
      this.component.handleClick(this.fakeEvent);

      expect(this.fakeEvent.preventDefault).not.toBeCalled();
    });
  });

  describe('Tests renderSections()', () => {
    it("Checks title is set to user's name", () => {
      this.component.currentUser = { name: 'Ben' };

      const rendered = this.component.renderSections(payload);

      expect(rendered.$children$.length).toBeGreaterThanOrEqual(1);
      const titleElement = rendered.$children$[0].$children$[0];
      expect(titleElement.$text$).toMatch(/\W?Hello Ben\W?/);
    });

    it("Checks title is empty string if user name doesn't exist", () => {
      this.component.currentUser = {};

      const rendered = this.component.renderSections(payload);

      expect(rendered.$children$.length).toBeGreaterThanOrEqual(1);
      const titleElement = rendered.$children$[0].$children$[0];
      expect(titleElement.$text$).toMatch(/\W?Hello\W+/);
    });

    [undefined, null].forEach(currentUser => {
      it(`Checks error is thrown if currentUser is ${currentUser}`, () => {
        this.component.currentUser = currentUser;

        expect(() => this.component.renderSections(payload)).toThrow();
      });
    });

    it('Checks element has expected children if given payload with nav objects', () => {
      this.component.currentUser = { name: 'Ben' };

      const rendered = this.component.renderSections(payload);

      const payloadElements = rendered.$children$[1];
      expect(payloadElements.$children$[0].$children$[0].$children$[0].$attrs$['automation-id']).toEqual(payload.children[0][0]['automation-id']);
    });

    it('Checks element has expected children if given payload with strings', () => {
      this.component.currentUser = { name: 'Ben' };


      const rendered = this.component.renderSections(stringPayload);

      const payloadElements = rendered.$children$[1];
      expect(payloadElements.$children$[0].$children$[0].$text$).toEqual(stringPayload.children[0]);
    });
  });

  describe('Tests renderChild()', () => {
    const topLevelVal = [true, false];
    topLevelVal.forEach(value => {
      it(`Checks element has header if given child is a string and topLevel.value = ${value}`, () => {
        const rendered = this.component.renderChild('A Title', { value: value });

        const renderedElement = rendered.$children$[0];

        expect(renderedElement.$tag$).toEqual('h4');
        expect(renderedElement.$children$[0].$text$).toEqual('A Title');
        expect(renderedElement.$tag$).not.toEqual('ul');
      });

      it(`Checks element has list with expected contents if given child is not a string and topLevel.value = ${value}`, () => {
        const rendered = this.component.renderChild(payload.children[0], { value: value });

        const renderedElement = rendered.$children$[0];

        expect(renderedElement.$tag$).toEqual('ul');
        expect(renderedElement.$tag$).not.toEqual('h4');
        expect(renderedElement.$children$[0].$children$[0].$attrs$['automation-id']).toEqual(payload.children[0][0]['automation-id']);
      });

      it(`Checks element has list if given child is an empty array and topLevel.value = ${value}`, () => {
        const rendered = this.component.renderChild([], { value: value });

        const renderedElement = rendered.$children$[0];

        expect(renderedElement.$tag$).toEqual('ul');
        expect(renderedElement.$tag$).not.toEqual('h4');
      });
    });
  });

  describe('Tests renderChildHTML()', () => {
    it('Checks empty list is returned if child list is empty', () => {
      const child = [];

      const rendered = this.component.renderChildHTML(child, {});

      expect(rendered).toEqual([]);
    });

    it('Checks empty list is returned if child list contains only strings', () => {
      const child = ['One string', 'Two strings', 'Three strings'];

      const rendered = this.component.renderChildHTML(child, {});

      expect(rendered).toEqual([undefined, undefined, undefined]);
    });

    it('Checks list has top-level in class', () => {
      const childConfig = [{
        "title": "My profile",
        "automation-id": "sh-my-profile",
        "href": "https://int.crossroads.net/profile/personal"
      }];

      const rendered = this.component.renderChildHTML(childConfig, {value: false});
      const renderedChildren = rendered[0];

      expect(renderedChildren.$attrs$.class).toEqual('top-level');
    });

    it('Checks list does not have top-level in class', () => {
      const childConfig = [{
        "title": "My profile",
        "automation-id": "sh-my-profile",
        "href": "https://int.crossroads.net/profile/personal"
      }];

      const rendered = this.component.renderChildHTML(childConfig, {value: true});
      const renderedChildren = rendered[0];

      expect(renderedChildren.$attrs$.class).toEqual('');
    });

    it('Checks list of elements is returned if child list contains expected objects', () => {
      const childConfig = [{
        "title": "My profile",
        "automation-id": "sh-my-profile",
        "href": "https://int.crossroads.net/profile/personal"
      }];

      const rendered = this.component.renderChildHTML(childConfig, {});
      const renderedChildren = rendered[0].$children$;
      expect(renderedChildren.length).toBeGreaterThanOrEqual(1);

      const renderedElement = renderedChildren[0]

      expect(renderedElement.$attrs$['automation-id']).toBe(childConfig[0]['automation-id']);
      expect(renderedElement.$attrs$['href']).toBe(childConfig[0]['href']);
      expect(renderedElement.$children$[0].$text$).toBe(childConfig[0]['title']);
      expect(renderedElement.$tag$).toBe('nav-link');
      expect(typeof renderedElement.$attrs$['onSignOutClicked']).toBe('function');
    });

    it('Checks signout is handled if element should signout', () => {
      const childConfig = [{
        "title": "My profile",
        "automation-id": "sh-my-profile",
        "href": "https://int.crossroads.net/profile/personal"
      }];
      const fakeEvent = {
        preventDefault: jest.fn()
      };

      this.component.onSignOut = jest.fn();

      const rendered = this.component.renderChildHTML(childConfig, {});
      const renderedElement = rendered[0].$children$[0];

      renderedElement.$attrs$.onSignOutClicked(fakeEvent);

      expect(this.component.onSignOut).toBeCalledTimes(1);
      expect(fakeEvent.preventDefault).toBeCalledTimes(1);
    });

    it('Checks signout is not called if element should not signout', () => {
      const childConfig = [{
        "title": "My profile",
        "automation-id": "sh-my-profile",
        "href": "https://int.crossroads.net/profile/personal"
      }];
      const fakeEvent = {
        preventDefault: jest.fn()
      };

      const rendered = this.component.renderChildHTML(childConfig, {});
      const renderedElement = rendered[0].$children$[0];

      renderedElement.$attrs$.onSignOutClicked(fakeEvent);

      expect(fakeEvent.preventDefault).not.toBeCalled();
    });
  });

  describe('Tests render()', () => {
    it('Checks null is returned if profile nav is not showing', () => {
      this.component.profileNavIsShowing = false;

      const rendered = this.component.render();

      expect(rendered).toBeNull();
    });

    it('Checks profile nav element is returned', () => {
      this.component.profileNavIsShowing = true;
      this.component.currentUser = { avatarUrl: 'https://int.crossroads.net/proxy/gateway/api/image/profile/7772248' };
      this.component.data = payload;

      const rendered = this.component.render();

      expect(rendered.$attrs$.class).toBe('profile-nav');
    });

    it('Checks profile nav contains user avatar', () => {
      this.component.profileNavIsShowing = true;
      this.component.currentUser = { avatarUrl: 'https://int.crossroads.net/proxy/gateway/api/image/profile/7772248' };
      this.component.data = payload;

      const rendered = this.component.render();
      const renderedNavImage = rendered.$children$[0].$attrs$;

      expect(renderedNavImage.class).toBe('profile-nav-img');
      expect(renderedNavImage.style.backgroundImage).toMatch(/.*url\('https:\/\/int.crossroads.net\/proxy\/gateway\/api\/image\/profile\/7772248'\).*/);
    });

    it('Checks profile nav contains expected child elements in order', () => {
      this.component.profileNavIsShowing = true;
      this.component.currentUser = { name: 'Ben', avatarUrl: 'fakeUrl' };
      this.component.data = payload;

      const rendered = this.component.render();

      expect(rendered.$children$).toHaveLength(2);

      expect(rendered.$children$[0].$attrs$.class).toBe('profile-nav-img');

      const renderedName = rendered.$children$[1].$children$[0].$children$[0];
      expect(renderedName.$children$[0].$text$).toMatch(/\W?Hello Ben\W?/);

      const renderedNavLinks = rendered.$children$[1].$children$[0].$children$[1].$children$[0].$children$;
      [0,1,2].forEach(navLinkIndex => {
        expect(renderedNavLinks[navLinkIndex].$children$[0].$attrs$['automation-id']).toEqual(payload.children[0][navLinkIndex]['automation-id'])
      })

      const renderedHeader = rendered.$children$[1].$children$[0].$children$[2];
      expect(renderedHeader.$children$[0].$children$[0].$text$).toEqual(payload.children[1]);
    });


    [undefined, null].forEach(currentUser => {
      it(`Checks error is thrown if currentUser is ${currentUser}`, () => {
        this.component.profileNavIsShowing = true;
        this.component.currentUser = currentUser;

        expect(() => this.component.render()).toThrow();
      });
    });
  });
});
import { CrdsGreeting } from '../crds-greeting';

describe('<greeting-component> Render', () => {
  beforeEach(() => {
    this.greeting = new CrdsGreeting();
  });

  describe('Tests renderGreeting()', () => {
    it('does not display when user object is null', () => {
      this.greeting.user = null;
      const greeting = this.greeting.renderGreeting();
      expect(greeting).toBeUndefined();
    });

    it('does display nickname when user nickname is valid', () => {
      this.greeting.user = { contact: { firstName: 'first', nickName: 'nick' } };
      this.greeting.renderGreeting();
      const greeting = this.greeting.renderGreeting();
      expect(greeting['$children$'][0]['$text$']).toBe(
        `Welcome ${this.greeting.user.contact.nickName || this.greeting.user.contact.firstName || 'patron'}`
      );
    });

    it('does display first name when user nickname is invalid', () => {
      this.greeting.user = { contact: { firstName: 'first' } };
      this.greeting.renderGreeting();
      const greeting = this.greeting.renderGreeting();
      expect(greeting['$children$'][0]['$text$']).toBe(
        `Welcome ${this.greeting.user.contact.nickName || this.greeting.user.contact.firstName || 'patron'}`
      );
    });

    it('does display fallback greeting when user is invalid', () => {
      this.greeting.user = { contact: { } };
      this.greeting.renderGreeting();
      const greeting = this.greeting.renderGreeting();
      expect(greeting['$children$'][0]['$text$']).toBe(
        `Welcome ${this.greeting.user.contact.nickName || this.greeting.user.contact.firstName || 'patron'}`
      );
    });
  });
});

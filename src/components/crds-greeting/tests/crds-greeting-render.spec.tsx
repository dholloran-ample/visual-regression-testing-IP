import { CrdsGreeting } from '../crds-greeting';

describe('<greeting-component> Render', () => {
  beforeEach(() => {
    this.greeting = new CrdsGreeting();
    this.greeting.defaultName = 'Boris';
  });

  describe('Tests renderGreeting()', () => {
    it('displays default name if no user is found', () => {
      this.greeting.user.contact = {nickname: null, firstName: null};
      const greet = this.greeting.renderGreeting();
      expect(greet).toContain('Boris');
    });

    it('does display nickname when user nickname is valid', () => {
      this.greeting.user = { contact: { firstName: 'first', nickName: 'nick' } };
      const greet = this.greeting.renderGreeting();
      expect(greet).toContain('nick');
    });

    it('does display first name when user nickname is invalid', () => {
      this.greeting.user = { contact: { nickName: null, firstName: 'first' } };
      const greet = this.greeting.renderGreeting();
      expect(greet).toContain('first');
    });

    it('changes greeting with time', () => {
      const timeBasedGreeting = this.greeting.parseTimeBasedGreetings(0);;
      expect(timeBasedGreeting).toContain('Good morning');
    });
  });
});

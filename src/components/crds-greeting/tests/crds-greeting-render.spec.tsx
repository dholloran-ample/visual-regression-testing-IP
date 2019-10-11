import { CrdsGreeting } from '../crds-greeting';

describe('<greeting-component> Render', () => {
  beforeEach(() => {
    this.greeting = new CrdsGreeting();
    this.greeting.defaultName = 'Boris';
  });

  describe('Tests renderGreeting()', () => {
    it('displays default name if no user is found', () => {
      this.greeting.user = { nickname: null, firstName: null };
      this.greeting.getDisplayName();
      const greet = this.greeting.renderName();
      expect(greet).toContain('Boris');
    });

    it('does display nickname when user nickname is valid', () => {
      this.greeting.user = { firstName: 'first', nickName: 'nick' };
      this.greeting.getDisplayName();
      const greet = this.greeting.renderName();
      expect(greet).toContain('nick');
    });

    it('does display first name when user nickname is invalid', () => {
      this.greeting.user = { nickName: null, firstName: 'first' };
      this.greeting.getDisplayName();
      const greet = this.greeting.renderName();
      expect(greet).toContain('first');
    });

    it('changes greeting with time', () => {
      const timeBasedGreeting = this.greeting.parseTimeBasedGreetings(0);
      expect(timeBasedGreeting).toContain('Good morning');
    });
  });
});

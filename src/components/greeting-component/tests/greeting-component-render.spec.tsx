import { GreetingComponent } from '../greeting-component';

describe('<greeting-component> Render', () => {
  beforeEach(() => {
    this.greeting = new GreetingComponent();
  })

  describe('Tests renderGreeting()', () => {
    it('does not display when user object is null', () => {
      this.greeting.user = null;

      const greeting = this.greeting.renderGreeting();

      expect(greeting).toBeUndefined();
    })

    it('does display when user object is valid', () => {
      this.greeting.user = { contact: { firstName: 'first', nickName: 'nick' } }

      const greeting = this.greeting.renderGreeting();

      expect(greeting).not.toBeUndefined();
    })
  })
})

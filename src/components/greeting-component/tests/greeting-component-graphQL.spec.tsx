import { GreetingComponent } from '../greeting-component';
import { getSessionID, user_with_nickname, user_without_nickname } from '../../../shared/test_users_auth';

describe('<greeting-component> GraphQL', () => {
  beforeEach(async () => {
    this.greeting = new GreetingComponent();

    // Waiting on JJ refactor
    // this.nickNameToken = await getSessionID(user_with_nickname.email, user_with_nickname.password);
    // this.firstNameToken = await getSessionID(user_without_nickname.email, user_without_nickname.password);
  })

  describe('Tests fetchUser()', () => {
    it('checks that first name and nickname of user without nickname set are the same', () => {
      expect(this.greeting.user).toBeNull();
      //TODO
    })

    it('checks that first name and nickname of user with set nickname are different', () => {
      expect(this.greeting.user).toBeNull();
      //TODO
    })
  })
})

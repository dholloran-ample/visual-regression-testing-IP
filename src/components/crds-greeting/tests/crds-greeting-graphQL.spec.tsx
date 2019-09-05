import { CrdsGreeting } from '../crds-greeting';
import { getSessionID, user_with_nickname } from '../../../shared/test_users_auth';
import { CrdsApollo } from '../../../shared/apollo';

describe('<greeting-component> GraphQL', () => {
  beforeEach(async () => {
    this.greetingComponent = new CrdsGreeting();
    this.lastError = {};
    this.skip = false;
    this.greetingComponent.logError = err => {
      this.lastError.error = err;
    };

    if(user_with_nickname.password === 'skip'){
      this.skip = true;
    } else {
      this.greetingComponent.authToken = await getSessionID(user_with_nickname.email, user_with_nickname.password);
      this.greetingComponent.apolloClient = CrdsApollo(this.greetingComponent.authToken);
    }
  });

  describe('Tests getUserName() with nickname', () => {
    it('checks that first name and nickname of user without nickname set are different', async () => {
      if(this.skip) {
        console.log("skipping test in production");
        return;
      } else {
        await this.greetingComponent.getUserName();
        expect(this.greetingComponent.user.contact.firstName).toBe('Leia');
        expect(this.greetingComponent.user.contact.nickName).toBe('Princess');
      }
    });
  });
});

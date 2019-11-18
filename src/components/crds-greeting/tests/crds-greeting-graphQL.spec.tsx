import { CrdsGreeting } from '../crds-greeting';
import { getSessionID, user_with_nickname } from '../../../shared/test_users_auth';
import { ReplaySubject } from 'rxjs';
import { authInit } from '../../../global/authInit';
import { CrdsApolloService } from '../../../shared/apollo';

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
      const authToken = await getSessionID(user_with_nickname.email, user_with_nickname.password);
      window['apolloClient'] = new ReplaySubject();
      authInit(authToken);
      await CrdsApolloService.subscribeToApolloClient();
      this.greetingComponent.CrdsApolloService = CrdsApolloService;
    }
  });

  describe('Tests getUser() with nickname', () => {
    it('checks that first name and nickname of user without nickname set are different', async () => {
      if(this.skip) {
        console.log("skipping test in production");
        return;
      } else {
        await this.greetingComponent.getUser();
        expect(this.greetingComponent.user.firstName).toBe('Leia');
        expect(this.greetingComponent.user.nickName).toBe('Princess');
      }
    });
  });
});

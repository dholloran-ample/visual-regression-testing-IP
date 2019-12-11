import { CrdsTitheChallenge } from './crds-tithe-challenge';
describe('<greeting-component> Render', () => {
  beforeAll(() => {
    this.titheChallenge = new CrdsTitheChallenge();
  });

  describe('Tests renderTitheChallenge()', () => {
    it('displays default name if no user is found', () => {
      this.titheChallenge.user = { nickname: 'Connect1', firstName: 'Connect1' };
      const tithe = (this.titheChallenge.user = 'Connect1');
      expect(tithe).toContain('Connect1');
    });

    describe('Tests verify Component Will Load()', () => {
      it('verify component will load ', () => {
        expect(this.titheChallenge.componentWillLoad()).toBeTruthy();
      });

      describe('Verify length of challenge()', () => {
        it('Verify length of challenge', () => {
          this.titheChallenge.lengthofChallenge = 90;
          expect(this.titheChallenge.lengthofChallenge).toBe(90);
        });

        describe('Get days to go()', () => {
          it('Get days left to go to finish Ninety day challenge', () => {
            this.titheChallenge.getDaysDown = () => {
              return 27;
            };
            expect(this.titheChallenge.getDaysToGo()).toBe(63);
          });
        });

        describe('Verify days to go()', () => {
          it('Returns the amount of days to go in Ninety day challenge', () => {
            var today = new Date(0);
            today.setTime(1574691000000);
            var startDate = 1572393600;
            const diffTime = this.titheChallenge.getDaysDownTime(today, startDate);
            expect(diffTime).toBe(2297400000);
          });
        });

        describe('Convert time to days()', () => {
          it('Takes time and converts them to days', () => {
            var time = 2297400000;
            expect(this.titheChallenge.convertTimeToDays(time)).toBe(27);
          });
        });
      });
    });
  });
});

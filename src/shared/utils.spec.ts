import { Utils } from './utils'

describe('Utils', () => {
  describe('isMobile()', () => {
    it('Returns true when in mobile view', () => {
      expect(Utils.isMobile(600)).toBe(true);
    })
    
    it('Returns false when in desktop view', () => {
      expect(Utils.isMobile(800)).toBe(false);
    })
  })
})

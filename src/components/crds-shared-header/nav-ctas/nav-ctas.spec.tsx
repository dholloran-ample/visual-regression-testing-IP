import { NavCtas } from "./nav-ctas";

describe('<nav-ctas>', () => {
  beforeEach(() => {
    this.component = new NavCtas();
  });

  describe('Tests decodedData()', () =>{
    it('Checks empty string is returned when there is no data', () => {
      const decoded = this.component.decodedData();
      expect(decoded).toBe('');
    });

    it('Checks empty string returned when data is an object', () => {
      this.component.data = {"config": "something", "promos": "promos"};
      const decoded = this.component.decodedData();
      expect(decoded).toBe('');
    });

    it('Checks decoded html returned when data is encoded string', () => {
      this.component.data = "&lt;h3&gt;More About Crossroads (INT)&lt;/h3&gt;&lt;a href=&quot;/explore&quot; data-automation-id=&quot;sh-explore&quot; class=&quot;cta&quot;&gt;  &lt;div class=&quot;cta-image&quot;&gt;";
      const decoded = this.component.decodedData();
      expect(decoded).toBe("<h3>More About Crossroads (INT)</h3><a href=\"/explore\" data-automation-id=\"sh-explore\" class=\"cta\">  <div class=\"cta-image\">");
    });

    it('Checks plain text is returned when data is plain text', () => {
      this.component.data = "This should be unaffected by the decoding process."
      const decoded = this.component.decodedData();
      expect(decoded).toBe("This should be unaffected by the decoding process.");
    });
  });

  describe('Tests render()', () => {
    it('Checks null is returned if component is active', () => {
      this.component.active = true;
      const rendered = this.component.render();
      expect(rendered).toBeNull();
    });

    it('Checks component is returned with default active state', () => {
      expect(this.component.active).toBeFalsy();

      const rendered = this.component.render();
      expect(rendered).not.toBeNull();
      expect(rendered['$attrs$'].class).toEqual('ctas');
    });

    it('Checks component has no CTAs if not given data', () => {
      this.component.active = false;
      this.component.data = '';

      const rendered = this.component.render();

      expect(rendered['$attrs$'].class).toEqual('ctas');
      expect(rendered['$attrs$'].innerHTML).toEqual('');
    });

    it('Checks component has CTAs if not given data', () => {
      this.component.active = false;
      this.component.data = '<h3>More About Crossroads (INT)</h3>';

      const rendered = this.component.render();

      expect(rendered['$attrs$'].class).toEqual('ctas');
      expect(rendered['$attrs$'].innerHTML).toEqual('<h3>More About Crossroads (INT)</h3>');
    });
  });
});
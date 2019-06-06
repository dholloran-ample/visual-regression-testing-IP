import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'nav-ctas',
  styleUrl: 'nav-ctas.scss',
  shadow: true
})
export class NavCtas {
  @Prop() href: string;
  @Prop() active: string;

  render() {
    if (this.active) return null;

    return (
      <div class="ctas">
        <h3>Happening at Crossroads</h3>

        <a href="#" data-automation-id="sh-undivided" class="cta">
          <div class="cta-image">
            <img src="https://via.placeholder.com/300x225.png?text=placeholder" />
          </div>
          <div class="cta-content">
            <h4>Undivided</h4>
            <p>A journey on race, relationship, and reconciliation.</p>
          </div>
        </a>

        <a href="#" data-automation-id="sh-sheets" class="cta">
          <div class="cta-image">
            <img src="https://via.placeholder.com/300x225.png?text=placeholder" />
          </div>
          <div class="cta-content">
            <h4>Wash the Sheets, Skip the Advice</h4>
            <p>Kim Botto</p>
          </div>
        </a>

        <a href="#" data-automation-id="sh-lead" class="cta">
          <div class="cta-image">
            <img src="https://via.placeholder.com/300x225.png?text=placeholder" />
          </div>
          <div class="cta-content">
            <h4>LEAD A GO LOCAL PROJECT</h4>
            <p>Sign up before Monday, March 4</p>
          </div>
        </a>

        <a href="" data-automation-id="sh-more-updates" class="more-updates">
          more updates
        </a>
      </div>
    );
  }
}

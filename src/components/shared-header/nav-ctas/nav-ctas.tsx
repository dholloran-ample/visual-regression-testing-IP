import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'nav-ctas',
  styleUrl: 'nav-ctas.scss',
  shadow: false
})
export class NavCtas {
  @Prop() href: string;
  render() {
    return (
      <div class="ctas">
        <h3>Happening at Crossroads</h3>

        <div class="cta">
          <div class="cta-image">
            <img src="https://via.placeholder.com/300x225.png?text=placeholder" />
          </div>
          <div class="cta-content">
            <h4>Undivided</h4>
            <p>A journey on race, relationship, and reconciliation.</p>
          </div>
        </div>

        <div class="cta">
          <div class="cta-image">
            <img src="https://via.placeholder.com/300x225.png?text=placeholder" />
          </div>
          <div class="cta-content">
            <h4>Wash the Sheets, Skip the Advice</h4>
            <p>Kim Botto</p>
          </div>
        </div>

        <div class="cta">
          <div class="cta-image">
            <img src="https://via.placeholder.com/300x225.png?text=placeholder" />
          </div>
          <div class="cta-content">
            <h4>LEAD A GO LOCAL PROJECT</h4>
            <p>Sign up before Monday, March 4</p>
          </div>
        </div>
      </div>
    );
  }
}

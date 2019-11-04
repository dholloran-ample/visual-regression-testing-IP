import { Component, Prop, Element, h } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import { Utils } from '../../shared/utils';

@Component({
  tag: 'crds-image-title-cutout',
  styleUrl: 'crds-image-title-cutout.scss',
  shadow: true
})
export class CrdsImageBottomTitleOverlay {
  @Prop() imageUrl: string;
  @Prop() title: string;
  @Prop() imageHref: string;
  @Prop() titleHref: string;
  @Element() public host: HTMLStencilElement;

  private addTextCutout() {
    if (!this.host) return;
    const titleEl: any = this.host.shadowRoot.querySelector('.title-cutout');
    const imageEl: any = this.host.shadowRoot.querySelector('.image');
    if (!titleEl || !imageEl) return;

    const titlePos = titleEl.getBoundingClientRect();
    const imagePos = imageEl.getBoundingClientRect();
    const titleXPaddingAndMargin = 10;
    const cutOutMaxX = 16 + titlePos.width - titleXPaddingAndMargin + 1;
    const cutOutMinX = 16 - titleXPaddingAndMargin;
    const cutOutMaxY = imagePos.height - 0.5 * titlePos.height;
    imageEl.style.WebkitClipPath = `polygon(0 0, 100% 0, 100% 100%, ${cutOutMaxX}px 100%, ${cutOutMaxX}px ${cutOutMaxY}px, ${cutOutMinX}px ${cutOutMaxY}px, ${cutOutMinX}px 100%, 0 100%)`;
  }

  private componentDidLoad() {
    window.addEventListener('resize', () => this.addTextCutout());
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this, this.addTextCutout();
          }
        });
      },
      {
        threshold: 1.0
      }
    );

    observer.observe(this.host);
  }

  public render() {
    return (
      <div>
        <div class="image-container">
          <img
            class="image"
            src={Utils.imgixify(this.imageUrl + '?auto=format&ar=263:100&fit=crop')}
            onClick={() => {
              Utils.openInNewTab(this.imageHref);
            }}
          />
        </div>
        <div class="card-block text-left">
          <a href="{this.title}" class="text-white text-uppercase title-cutout">
            {this.title}
          </a>
        </div>
      </div>
    );
  }
}

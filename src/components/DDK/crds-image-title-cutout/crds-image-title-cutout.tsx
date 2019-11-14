import { Component, Prop, Element, h } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import { Utils } from '../../../shared/utils';

@Component({
  tag: 'crds-image-title-cutout',
  styleUrl: 'crds-image-title-cutout.scss',
  shadow: true
})
export class CrdsImageBottomTitleOverlay {
  @Prop() imageUrl: string;
  @Prop() cardTitle: string;
  @Prop() imageHref: string;
  @Prop() titleHref: string;
  @Element() host: HTMLStencilElement;

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

  public componentWillLoad() {
    window.addEventListener('resize', () => this.addTextCutout());
    
    const mutationObserver = new MutationObserver(() => {
      console.log('muation observer hit');
      this.addTextCutout();
    });
    const config = { attributes: true, childList: true, subtree: true };
    mutationObserver.observe(this.host, config);

    const intersectionObserver = new IntersectionObserver(
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
    intersectionObserver.observe(this.host);

  }

  public render() {
    console.log(this.imageUrl);
    return (
      <div>
        <img
          class="image"
          src={this.imageUrl}
          onClick={() => {
            Utils.openInNewTab(this.imageHref);
          }}
        />
        <div class="card-block text-left">
          <a href={this.titleHref} class="text-uppercase title-cutout">
            {this.cardTitle}
          </a>
        </div>
      </div>
    );
  }
}

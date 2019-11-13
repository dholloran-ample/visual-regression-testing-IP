// Stencil
import { h, Prop, Component, Element } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';

@Component({
  tag: 'crds-default-card',
  styleUrl: 'crds-default-card.scss',
  shadow: true
})
export class CrdsDefaultLayout {
  @Element() element: HTMLStencilElement;
  @Prop() contentType: string;
  @Prop() imageSrc: string;
  @Prop() heading: string;
  @Prop() category: string;
  @Prop() meta: string;
  @Prop({ reflect: false }) body: string;
  @Prop() buttonSrc: string;
  @Prop() thumbnailSrc: string;
  @Prop() url: string;
  @Prop() iconLabel: string;

  private icons = {
    article: 'media-article',
    video: 'media-video',
    message: 'media-video',
    series: 'media-video',
    episode: 'media-podcast',
    song: 'media-music'
  };

  public render() {
    const { imageSrc, heading, category, meta, thumbnailSrc, url, contentType, icons, iconLabel} = this;
    
    return (
      <div class="card-wrapper">
        <a class="card-image-wrapper" href={url}>
        { url && <div class="overlay"></div> }
          {imageSrc && <crds-image src={imageSrc} size="card" />}
          {icons[contentType] && (
            <div class="card-stamp-container">
              <span class="card-stamp">{iconLabel}</span>
              <crds-icon name={icons[contentType]} size={'15'} color={'white'} />
            </div>
          )}
          {thumbnailSrc && (
            <div class="card-thumbnail">
              <crds-image src={thumbnailSrc} size="thumbnail" />
            </div>
          )}
        </a>
        {category && <span class="card-meta-top">{category}</span>}

        {heading && (
          <a class={`card-heading`} href={url}>
            {heading}
          </a>
        )}

        {meta  && <span class="card-meta-bottom">{meta}</span>}

        <div class="card-content">
          <slot />
        </div>
      </div>
    );
  }
}

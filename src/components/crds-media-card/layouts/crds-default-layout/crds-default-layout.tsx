// Stencil
import { h, Prop, Component, Element } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';

@Component({
  tag: 'crds-default-card',
  styleUrl: 'crds-default-layout.scss',
  shadow: true
})
export class CrdsDefaultCard {
  @Element() element: HTMLStencilElement;
  @Prop() contentType: string;
  @Prop() imageSrc: string;
  @Prop() heading: string;
  @Prop() meta: string;
  @Prop() metaPosition: string;
  @Prop({ reflect: false }) body: string;
  @Prop() buttonSrc: string;
  @Prop() thumbnailSrc: string;
  @Prop() url: string;
  @Prop() nearestMinute: string;
  @Prop() author: string;
  @Prop() mediaTopic: string;
  @Prop() contentCount: number;

  private icons = {
    article: 'media-article',
    video: 'media-video',
    message: 'media-video',
    series: 'media-video',
    episode: 'media-podcast',
    song: 'media-music'
  };

  public render() {
    const { imageSrc, heading, meta, metaPosition, thumbnailSrc, url, contentType, icons } = this;

    return (
      <div class="card-wrapper">
        <a class="card-image-wrapper" href={url}>
          {imageSrc && <crds-image src={imageSrc} size="card" />}
          {icons[contentType] && (
            <div class="card-stamp-container">
              <crds-icon name={icons[contentType]} size={'15'} color={'white'} />
              <span class="card-stamp">{contentType}</span>
            </div>
          )}
          {thumbnailSrc && (
            <div class="card-thumbnail">
              <crds-image src={thumbnailSrc} size="thumbnail" />
            </div>
          )}
        </a>
        {metaPosition == 'top' && <span class="card-meta-top">{meta}</span>}

        {heading && (
          <a class={`card-heading`} href={url}>
            {heading}
          </a>
        )}

        {metaPosition == 'bottom' && <span class="card-meta-bottom">{meta}</span>}

        <div class="card-content">
          <slot />
        </div>
      </div>
    );
  }
}

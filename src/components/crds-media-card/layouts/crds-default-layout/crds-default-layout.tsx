// Stencil
import { h, Prop, Component } from '@stencil/core';

@Component({
  tag: 'crds-default-layout',
  styleUrl: 'crds-default-layout.scss',
  shadow: true
})
export class CrdsDefaultLayout {
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
    episode: 'media-podcast',
    song: 'media-music'
  };

  public render() {
    const { imageSrc, heading, meta, metaPosition, body, buttonSrc, thumbnailSrc, url, contentType, icons } = this;

    return (
      <div class="card-wrapper">
        <div class="card-image-wrapper">
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
        </div>
        {metaPosition == 'top' && <span class="card-meta-top">{meta}</span>}

        {heading && <h2 class={`card-heading`}> {heading} </h2>}

        {metaPosition == 'bottom' && <span class="card-meta-bottom">{meta}</span>}

        {body && <div class="card-content" innerHTML={body} />}
        {buttonSrc && (
          <a class="card-button" href={buttonSrc} role="button">
            Learn more
          </a>
        )}
      </div>
    );
  }
}

// Stencil
import { Component, Prop, Element, h, State, Watch } from '@stencil/core';

@Component({
  tag: 'crds-media-card',
  styleUrl: 'crds-media-card.scss',
  shadow: true
})
export class CrdsMediaCard {
  // Content
  @Prop() contentType: string;
  @Prop() contentLayout: string = 'default';

  // Default props
  @Prop() image: string;
  @Prop() heading: string;
  @Prop() meta: string;
  @Prop() metaPosition: string;
  @Prop() body: string;
  @Prop() src: string;
  @Prop() thumbnailSRC: string;
  @Prop() url: string;

  // article / video Podcast episode, message, song props
  @Prop() nearestMinute: string;
  @Prop() author: string;
  @Prop() mediaTopic: string;

  // Album & podcast props
  @Prop() contentCount: number;

  // state
  @State() isVisible: boolean = false;
  @State() childProps = {};

  @Element() element: HTMLElement;

  // Validations
  @Watch('contentType')
  validateContentType(newValue: string) {
    if (typeof newValue != null && this.contentTypes.indexOf(newValue) == -1) {
      throw new Error(`${newValue} is not a valid value for contentType`);
    }
  }

  @Watch('contenLayout')
  validateContentLayout(newValue: string) {
    if (typeof newValue != null && this.contentLayouts.indexOf(newValue) == -1) {
      throw new Error(`${newValue} is not a valid value for contentLayout`);
    }
  }

  @Watch('image')
  validateName(newValue: string) {
    const isEmpty = typeof newValue == null;
    if (isEmpty) {
      throw new Error('image property is required on all media cards');
    }
  }

  private propNames = [
    'image',
    'heading',
    'subtitle',
    'metadata',
    'description',
    'buttonHREF',
    'nearestMinute',
    'author',
    'mediaTopic',
    'thumbImageHREF',
    'contentCount'
  ];

  private contentLayouts = ['default', 'overlay', 'media-object'];
  private contentTypes = ['article', 'video', 'podcast-episode', 'message', 'song', 'series', 'album', 'podcast'];

  // ----------------------------------------------- | Methods

  componentWillLoad() {
    // Set props for child component
    this.childProps = this.propNames.filter(prop => this[prop] != undefined);
  }

  private getLayout = () => {
    return {
      default: <crds-default-layout {...this.childProps} />,
      overlay: <crds-overlay-layout {...this.childProps} />,
      'media-object': <crds-media-object-layout {...this.childProps} />
    }[this.contentLayout];
  };

  public render() {
    return this.getLayout();
  }
}

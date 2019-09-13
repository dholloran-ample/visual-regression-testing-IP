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
  @Watch('image')
  validateName(newValue: string) {
    const isEmpty = typeof newValue == null;
    if (isEmpty) {
      throw new Error('name: required');
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
  private contentTypes = [''];

  // ----------------------------------------------- | Methods

  componentWillLoad() {
    // Set props for child component
    this.childProps = this.propNames.filter(prop => this[prop] != undefined);
    // !this.contentLayouts[this.contentLayout] &&
    //   console.error(`${this.contentLayout} is not a layout type for crds-media-card`);
  }

  private getLayout = () => {
    const layout = {
      default: <crds-default-layout {...this.childProps} />,
      overlay: <crds-overlay-layout {...this.childProps} />,
      'media-object': <crds-media-object-layout {...this.childProps} />
    }[this.contentLayout];

    return layout;
  };

  public render() {
    return this.getLayout();
  }
}

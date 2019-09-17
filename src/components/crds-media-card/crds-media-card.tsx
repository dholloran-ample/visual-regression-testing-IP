// Stencil
import { Component, Prop, Element, h, State } from '@stencil/core';

@Component({
  tag: 'crds-media-card',
  styleUrl: 'crds-media-card.scss',
  shadow: true
})
export class CrdsMediaCard {
  // ----------------------------------------------- | Instance Variables

  // Content
  @Prop() contentType: string;
  @Prop() contentLayout: string = 'default';

  // Default props
  @Prop() imageSrc: string;
  @Prop() heading: string;
  @Prop() meta: string;
  @Prop() metaPosition: string;
  @Prop({ reflect: false }) body: string;
  @Prop() buttonSrc: string;
  @Prop() thumbnailSrc: string;
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

  private propNames = [
    'imageSrc',
    'heading',
    'meta',
    'metaPosition',
    'body',
    'url',
    'buttonSrc',
    'nearestMinute',
    'author',
    'mediaTopic',
    'thumbnailSrc',
    'contentCount',
    'contentType'
  ];

  private contentLayouts = ['default', 'overlay', 'media-object'];
  private contentTypes = ['article', 'video', 'podcast-episode', 'message', 'song', 'series', 'album', 'podcast'];
  private metaPositions = ['top', 'bottom'];

  // ----------------------------------------------- | Validations
  private validateContentType() {
    if (typeof this.contentType != 'undefined' && this.contentTypes.indexOf(this.contentType) == -1) {
      throw new Error(`${this.contentType} is not a valid value for contentType`);
    }
  }

  private validateContentLayout() {
    if (typeof this.contentLayout != 'undefined' && this.contentLayouts.indexOf(this.contentLayout) == -1) {
      throw new Error(`${this.contentLayout} is not a valid value for contentLayout`);
    }
  }

  private validateImage() {
    const isEmpty = typeof this.imageSrc == 'undefined';
    if (isEmpty) {
      throw new Error('imageSrc property is required on all media cards');
    }
  }

  private validateMeta() {
    if (typeof this.meta != 'undefined' && typeof this.metaPosition == 'undefined') {
      throw new Error(`metaPosition is required if you want to provide a meta`);
    }
  }

  private validateMetaPosition() {
    if (typeof this.metaPosition != 'undefined' && this.metaPositions.indexOf(this.metaPosition) == -1) {
      throw new Error(`${this.metaPosition} is not a valid value for metaPosition`);
    } else if (typeof this.meta == 'undefined' && typeof this.metaPosition != 'undefined') {
      throw new Error(`Meta is required if you want to provide a meta posittion`);
    }
  }

  // ----------------------------------------------- | Methods

  componentWillLoad() {
    // Set props for child component
    this.propNames
      .filter(prop => this[prop] != undefined)
      .forEach(prop => {
        this.childProps[prop] = this[prop];
      });
  }

  private getLayout = () => {
    return {
      default: <crds-default-layout {...this.childProps} />,
      overlay: <crds-overlay-layout {...this.childProps} />,
      'media-object': <crds-media-object-layout {...this.childProps} />
    }[this.contentLayout];
  };

  private runValidations() {
    this.validateImage();
    this.validateContentLayout();
    this.validateContentType();
    this.validateMeta();
    this.validateMetaPosition();
  }

  connectedCallback() {
    this.runValidations();
  }

  public render() {
    return this.getLayout();
  }
}

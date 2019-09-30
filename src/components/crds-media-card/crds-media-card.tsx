// Stencil
import { Component, Prop, Element, h, State } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';

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
  @Prop() thumbnailSrc: string;
  @Prop() url: string;

  @Element() element!: HTMLStencilElement;
  // state
  @State() isVisible: boolean = false; // Will be used for skeleton blocks/prerendering
  @State() childProps = {};

  private propNames = ['imageSrc', 'heading', 'meta', 'metaPosition', 'body', 'url', 'thumbnailSrc', 'contentType'];
  private contentLayouts = ['default', 'overlay', 'media-object'];
  private contentTypes = ['article', 'video', 'episode', 'message', 'song', 'series', 'album', 'podcast'];
  private metaPositions = ['top', 'bottom'];

  // ----------------------------------------------- | Validations
  private validateContentType() {
    if (typeof this.contentType != 'undefined' && !this.contentTypes.includes(this.contentType)) {
      throw new Error(`${this.contentType} is not a valid value for contentType`);
    }
  }

  private validateContentLayout() {
    if (typeof this.contentLayout != 'undefined' && !this.contentLayouts.includes(this.contentLayout)) {
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
    if (typeof this.metaPosition != 'undefined' && !this.metaPositions.includes(this.metaPosition)) {
      throw new Error(`${this.metaPosition} is not a valid value for metaPosition`);
    } else if (typeof this.meta == 'undefined' && typeof this.metaPosition != 'undefined') {
      throw new Error(`Meta is required if you want to provide a meta posittion`);
    }
  }

  // ----------------------------------------------- | Methods

  componentDidLoad() {
    if (!document.getElementById('card-anchor-style')) {
      const style = document.createElement('style');
      style.innerText = `crds-media-card a {
        text-decoration: none;
        color: #0095D9;
      }`;
      style.id = 'card-anchor-style';
      this.element.before(style);
    }
  }
  componentWillLoad() {
    /* 
      Validates props passed to component against props assigned/related to children.
      Stencil doesn't have out of the box support for props.
    */

    this.propNames
      .filter(prop => this[prop] != undefined)
      .forEach(prop => {
        this.childProps[prop] = this[prop];
      });
  }

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
    return (
      <div>
                
        {this.contentLayout == 'default' && (
          <crds-default-card {...this.childProps}>
            <slot />
          </crds-default-card>
        )}
        {this.contentLayout == 'overlay' && <crds-overlay-card {...this.childProps} />}
                
        {this.contentLayout == 'media-object' && (
          <crds-media-object-card {...this.childProps}>
            <slot />
          </crds-media-object-card>
        )}
      </div>
    );
  }
}

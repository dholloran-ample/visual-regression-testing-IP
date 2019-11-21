// Stencil
import { Component, Prop, Element, h, State } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';

@Component({
  tag: 'crds-media-card',
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
  @Prop() category: string;
  @Prop() meta: string;
  @Prop({ reflect: false }) body: string;
  @Prop() thumbnailSrc: string;
  @Prop() url: string;
  @Prop() iconLabel: string;
  @Prop() truncateDescription: boolean = false;
  @Prop() truncateLength: number = 15; 

  @Element() element!: HTMLStencilElement;
  // state
  @State() isVisible: boolean = false; // Will be used for skeleton blocks/prerendering
  @State() childProps = {};

  private propNames = ['imageSrc', 'heading', 'category', 'meta', 'body', 'url', 'thumbnailSrc', 'contentType', 'iconLabel'];
  private contentLayouts = ['default', 'overlay', 'media-object'];
  private contentTypes = ['article', 'video', 'episode', 'message', 'song', 'series', 'album', 'podcast'];

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

  private truncateDesc(){
    const sentences = this.element.textContent.split('\n').join('');
    let truncatedDescription = sentences.replace(/ +(?= )/g,'').trim().split(' ').slice(0,this.truncateLength).join(' ');
    truncatedDescription += '...';
    this.element.children[0].textContent = truncatedDescription;
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
      Stencil doesn't have out of the box support for passing props {... this.props }.
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
  }

  connectedCallback() {
    this.runValidations();
  }

  public render() {

    if(this.truncateDescription && this.element.children.length){
      this.truncateDesc();
    }

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

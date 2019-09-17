import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'crds-image',
  styleUrl: 'crds-image.scss',
  shadow: true
})
export class CrdsImage {
  @Prop() src: string;
  @Prop() size: string;

  @State() imgDidLoad: boolean = false;
  @State() cachedImg: HTMLElement;

  private imgWrapper: HTMLDivElement;

  private sizes = ['card', 'thumbnail', 'overlay', 'media-object'];

  private validateSize() {
    if (this.sizes.indexOf(this.size) == -1) {
      throw new Error(`${this.size} is an invalid value for crds-image size`);
    }
  }

  connectedCallback() {
    this.validateSize();
  }

  public addObserver() {
    // Cache Image
    const img = new Image();
    img.classList.add('crds-img');

    img.onload = () => {
      this.imgDidLoad = true;
      this.cachedImg = img;
      img.classList.add('loaded');
    };

    // Create observer
    const options = {
      threshold: 0
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0) {
          img.src = this.src;
        }
      });
    }, options);
    observer.observe(this.imgWrapper);
  }

  public componentDidLoad() {
    this.addObserver();
  }

  render() {
    const { imgDidLoad, cachedImg, size } = this;
    return (
      <div
        class={`crds-img-container ${size}`}
        data-instrinsic="4:3"
        innerHTML={imgDidLoad ? cachedImg.outerHTML : ''}
        ref={el => (this.imgWrapper = el as HTMLDivElement)}
      />
    );
  }
}

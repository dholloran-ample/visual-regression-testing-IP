import { Component, Prop, State, h } from "@stencil/core";

@Component({
  tag: "crds-image",
  styleUrl: "crds-image.scss",
  shadow: true
})
export class CrdsImage {
  @Prop() src: string;
  @State() imgDidLoad: boolean = false;
  @State() cachedImg: HTMLElement;

  private imgWrapper: HTMLDivElement;

  public addObserver() {
    
    // Cache Image
    const img = new Image();
    img.classList.add("crds-img");

    img.onload = () => {
      this.imgDidLoad = true;
      this.cachedImg = img;
      img.classList.add("loaded");
    };

    // Create observer
    const options = {
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
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
    return (
      <div
        class="crds-img-container"
        data-instrinsic="4:3"
        innerHTML={this.imgDidLoad ? this.cachedImg.outerHTML : ""}
        ref={el => (this.imgWrapper = el as HTMLDivElement)}
      >
      </div>
    );
  }
}
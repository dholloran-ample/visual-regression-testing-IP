// Stencil
import { h, Prop, Component } from '@stencil/core';

@Component({
  tag: 'crds-default-layout',
  styleUrl: 'crds-default-layout.scss',
  shadow: true
})
export class CrdsDefaultLayout {
  @Prop() image: string;
  @Prop() heading: string;
  @Prop() meta: string;
  @Prop() metaPosition: string;
  @Prop() body: string;
  @Prop() src: string;
  @Prop() thumbnailSRC: string;
  @Prop() url: string;

  public render() {
    return <div>Hello there</div>;
  }
}

import { Component, State, Prop, h } from '@stencil/core';
import Fragment from '../../shared/fragment';

@Component({
  tag: 'crds-video',
  styleUrl: 'crds-video.scss',
  shadow: true
})
export class CrdsVideo {
  @Prop() youtubeId: string;
  @Prop() transcript: string;
  @Prop() active: boolean;
  @Prop() theme: string = '';


  embedUrl() {
    return `https://youtube.com/embed/${this.youtubeId}`;
  }

  renderIframe() {
    // @ts-ignore
    return <iframe class="embed-responsive-item" src={this.embedUrl()} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />;
  }

  onClick(e) {
    this.active = !this.active;
    let el = e.target;
    var content = el.nextElementSibling;
      content.classList.toggle('show');
      content.style.maxHeight = content.style.maxHeight ? null : `250px`;
  }

  btnText() {
    return this.active ? 'Close' : 'Transcript'
  }

  renderTranscript() {
    return (
      <div class="transcript">
        <button class={this.theme === 'light' ? 'transcript-btn-light' : 'transcript-btn'} type="button" onClick={this.onClick.bind(this)}>{this.btnText()}</button>
        <div class={this.theme === 'light' ? 'transcript-body-light' : 'transcript-body'} innerHTML={this.transcript} />
      </div>
    );
  }

  render() {
    return (
      <Fragment>
        <div class="embed-responsive">{this.renderIframe()}</div>
        {this.transcript && this.renderTranscript()}
      </Fragment>
    );
  }
}

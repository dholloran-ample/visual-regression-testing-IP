import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'subscribe-modal',
  styleUrl: 'subscribe-modal.scss',
  shadow: true
})
export class Subscribe {
  @Prop() modalIsShowing: boolean = false;
  @Prop() navClickHandler: Function;

  modalClasses() {
    let classes = ['modal'];
    if (this.modalIsShowing) classes.push('is-active');
    return classes.join(' ');
  }

  render() {
    console.log('subscribe-modal - modalIsShowing = ' + this.modalIsShowing);

    return (
      <div class={this.modalClasses()}>
        <div class="modal-container">
          <button onClick={event => this.navClickHandler(event)} type="button" class="close" />

          <div class="modal-content">
            <h2>Subscribe</h2>
            <span>Get our top picks delivered to your inbox every week.</span>

            <div>
              <label>*</label>
              <div class="input">
                <input placeholder="Email address" value="" autocomplete="email" type="text" />
              </div>
            </div>

            <input type="submit" value="Subscribe" class="submit" />
          </div>
        </div>
      </div>
    );
  }
}

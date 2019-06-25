import { Component, Prop, State } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'subscribe-modal',
  styleUrl: 'subscribe-modal.scss',
  shadow: true
})
export class Subscribe {
  @Prop() modalIsShowing: boolean = false;
  @Prop() navClickHandler: Function;
  @State() hubspotDidLoad = false;

  modalClasses() {
    let classes = ['modal'];
    if (this.modalIsShowing) classes.push('is-active');
    return classes.join(' ');
  }

  loadScript = () => {
    const hubspotEl = window.document.getElementById("hubspot");
    hubspotEl.addEventListener('load', () => {
      this.hubspotDidLoad = true;
    });
  };

  render() {

    console.log('subscribe-modal - modalIsShowing = ' + this.modalIsShowing);
    this.loadScript();

    return (
      <div
        class="modal fade"
        id="subscribeModalForm"
        tabindex="-1"
        role="dialog"
        aria-labelledby="Subscribe email form"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close pull-right" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body hard-bottom">
              <h3 class="font-family-condensed-extra font-size-h2 text-uppercase flush-top">Subscribe</h3>
              {this.hubspotDidLoad &&
                (window.document.getElementById("hubspot") as any).forms.create({
                  portalId: '3993985',
                  formId: '52b50268-5d9c-4369-8359-e96ff69094f9',
                  formInstanceId: '1',
                  submitButtonClass: 'btn btn-cyan btn-lg push-top',
                  errorMessageClass: 'hs-error-msgs inputs-list list-unstyled'
                })}
            </div>
            <div class="modal-footer" />
          </div>
        </div>
      </div>
    );
  }
}

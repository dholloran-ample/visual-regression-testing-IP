import { r as registerInstance, h, c as getElement } from './chunk-67523e50.js';
import { g as gql, C as CrdsApollo } from './chunk-3c377be1.js';
import './chunk-a9955f90.js';
import './chunk-950a1dca.js';

const GET_USER = gql `
  {
    user {
      firstName
      nickName
    }
  }
`;

class CrdsGreeting {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.user = null;
        this.displayName = null;
    }
    authTokenHandler(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.apolloClient = CrdsApollo(newValue);
            this.getUser();
        }
    }
    componentWillLoad() {
        this.apolloClient = CrdsApollo(this.authToken);
    }
    componentWillRender() {
        if (this.authToken)
            return this.getUser();
    }
    componentDidRender() {
        const renderedEvent = new CustomEvent('component rendered', {
            detail: this.host
        });
        document.dispatchEvent(renderedEvent);
        setTimeout(() => {
            this.host.shadowRoot.querySelector('.greeting').classList.add('fade-in');
        }, 0);
    }
    getUser() {
        return this.apolloClient
            .query({ query: GET_USER })
            .then(success => {
            this.user = success.data.user;
            this.getDisplayName();
            return;
        })
            .catch(err => {
            this.getDisplayName();
            this.logError(err);
        });
    }
    getDisplayName() {
        this.displayName = (this.user && (this.user.nickName || this.user.firstName)) || this.defaultName || '';
    }
    parseTimeBasedGreetings(hour) {
        if (hour >= 17)
            return 'Good evening';
        if (hour >= 12)
            return 'Good afternoon';
        return 'Good morning';
    }
    renderGreeting() {
        const date = new Date();
        const greeting = this.parseTimeBasedGreetings(date.getHours());
        return `${greeting}, ${this.displayName}`;
    }
    logError(err) {
        console.error(err);
    }
    render() {
        if (!this.displayName)
            return '';
        return (h("div", { class: "greeting" }, h("h3", { class: "font-size-large flush" }, this.renderGreeting()), h("p", { class: "flush" }, "This place was made for you!")));
    }
    get host() { return getElement(this); }
    static get watchers() { return {
        "authToken": ["authTokenHandler"]
    }; }
    static get style() { return "* {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n.relative {\n  position: relative;\n}\n\n.overflow-hidden {\n  overflow: hidden;\n}\n\n.d-flex {\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.d-block {\n  display: block;\n}\n\n.d-inline {\n  display: inline;\n}\n\n.d-none {\n  display: none;\n}\n\n.align-items-center {\n  -ms-flex-align: center;\n  align-items: center;\n}\n\n.w-100 {\n  width: 100%;\n}\n\n.img-responsive {\n  display: block;\n  height: auto;\n  max-width: 100%;\n}\n\nhr {\n  border: 0;\n  border-top: 1px solid #e7e7e7;\n  margin-bottom: 1rem;\n  margin-top: 1rem;\n}\n\n.font-family-base {\n  font-family: \"acumin-pro\", helvetica, arial, sans-serif !important;\n  font-weight: 300 !important;\n}\n\n.text-white {\n  color: #fff !important;\n}\n\n.text-gray-light {\n  color: #979797 !important;\n}\n\n.text-gray {\n  color: #737373 !important;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-uppercase.font-size-smaller {\n  font-size: 13px !important;\n  letter-spacing: 0.5px;\n}\n\n.font-size-base {\n  font-size: 16px !important;\n}\n\@media (min-width: 480px) {\n  .font-size-base {\n    font-size: 19px !important;\n  }\n}\n\n.font-size-large {\n  font-size: 19px !important;\n}\n\@media (min-width: 480px) {\n  .font-size-large {\n    font-size: 22px !important;\n  }\n}\n\n.font-size-smaller {\n  font-size: 14px !important;\n}\n\n.font-size-smallest {\n  font-size: 10px;\n}\n\n.font-weight-mid {\n  font-weight: 500;\n}\n\n.bg-charcoal {\n  background-color: #171717;\n}\n\n.flush {\n  margin: 0 !important;\n}\n\n.flush-bottom {\n  margin-bottom: 0 !important;\n}\n\n.flush-top {\n  margin-top: 0 !important;\n}\n\n.push-half-bottom {\n  margin-bottom: 12px !important;\n}\n\n.push-bottom {\n  margin-bottom: 24px !important;\n}\n\n.push-top {\n  margin-top: 24px;\n}\n\n.push-half-top {\n  margin-top: 12px !important;\n}\n\n.soft-quarter-top {\n  padding-top: 6px;\n}\n\n.component-header {\n  font-family: \"acumin-pro-extra-condensed\";\n  font-size: 2rem;\n  font-weight: 500;\n  line-height: 0.95;\n  text-transform: uppercase;\n}\n\@media (min-width: 480px) {\n  .component-header {\n    font-size: 2.125rem;\n  }\n}\n\n.card > a {\n  color: inherit;\n  display: block;\n  text-decoration: none;\n}\n.card img {\n  width: 100%;\n}\n\n.color-gray {\n  color: #737373;\n}\n\n.media-label {\n  display: -ms-flexbox;\n  display: flex;\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  padding: 6px 8px;\n}\n.media-label > *:not(:last-child) {\n  margin-right: 5px;\n}\n.media-label .icon {\n  fill: #fff;\n  height: 16px;\n  width: 12px;\n}\n\n.btn {\n  display: inline-block;\n  margin-bottom: 0;\n  font-weight: 300;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  -ms-touch-action: manipulation;\n  touch-action: manipulation;\n  cursor: pointer;\n  background-image: none;\n  border: 1px solid transparent;\n  padding: 8px 10px;\n  font-size: 16px;\n  line-height: 1.5;\n  border-radius: 4px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  border-radius: 4px;\n  line-height: 1;\n  margin-top: 5px;\n  margin-bottom: 5px;\n  font-size: 14px;\n  padding: 13px 16px;\n}\n.btn.btn-gray-light {\n  color: #fff;\n  background-color: #979797;\n  border-color: #979797;\n}\n.btn.btn-gray-light.btn-outline {\n  background: transparent;\n  border-style: solid;\n  border-width: 1px;\n  color: #979797;\n}\n.btn.btn-gray-light.btn-outline:hover {\n  background-color: #979797;\n  color: #fff;\n}\n.btn.btn-sm {\n  font-size: 13px;\n  padding: 10px 16px 11px;\n}\n\n.greeting {\n  opacity: 0;\n  -webkit-transition: opacity 0.45s 0.25s ease-in-out;\n  transition: opacity 0.45s 0.25s ease-in-out;\n}\n.greeting.fade-in {\n  opacity: 1;\n}"; }
}

export { CrdsGreeting as crds_greeting };

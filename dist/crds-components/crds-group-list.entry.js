import { r as registerInstance, h, c as getElement } from './chunk-67523e50.js';
import { g as gql, C as CrdsApollo } from './chunk-04a07178.js';
import './chunk-a9955f90.js';
import './chunk-950a1dca.js';
import { C as ContentBlockHandler } from './chunk-1fb009bf.js';

const GET_GROUPS = gql `
  {
    user {
      firstName
      nickName
      groups {
        id
        name
        image
        meeting {
          day
          time
          frequency
        }
        role {
          name
          id
        }
        type {
          name
          id
        }
      }
    }
  }
`;

class CrdsGroupList {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.validGroups = ['Small Group', 'Journey'];
    }
    authTokenHandler(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.apolloClient = CrdsApollo(newValue);
            this.getUserGroups();
        }
    }
    componentWillLoad() {
        this.apolloClient = CrdsApollo(this.authToken);
        this.contentBlockHandler = new ContentBlockHandler(this.apolloClient, 'group list');
        this.contentBlockHandler.getCopy();
        this.getUserGroups();
    }
    getUserGroups() {
        if (!this.authToken)
            return null;
        return this.apolloClient
            .query({ query: GET_GROUPS })
            .then(success => {
            this.user = success.data.user;
            this.leader = this.user.groups.filter(group => group.role.name === 'Leader').length > 0;
        })
            .catch(err => {
            this.logError(err);
        });
    }
    logError(err) {
        console.error(err);
    }
    renderLeaderTag(group) {
        if (group.role.name === 'Leader') {
            return h("p", { class: "leader-tag" }, h("span", { class: "label label-info" }, "Leader"));
        }
    }
    renderGroupList() {
        return this.user.groups.map(group => {
            if (this.validGroups.includes(group.type.name)) {
                return (h("div", { class: "group d-flex push-half-bottom" }, h("div", { class: "group-text" }, h("h4", { class: "list-header" }, h("a", { href: "#" }, group.name)), h("p", { class: "control-label text-gray-light flush" }, group.meeting.day, " at ", group.meeting.time, ", ", group.meeting.frequency), this.renderLeaderTag(group)), h("div", { class: "push-half-bottom group-image img-responsive img-circle", style: {
                        backgroundImage: `url('https://${group.image}')
                                 ,url('https://crossroads-media.imgix.net/images/avatar.svg')`
                    } })));
            }
        });
    }
    renderUserGroupState() {
        if (this.user && this.user.groups.length > 0) {
            return this.renderGroupList();
        }
        else {
            return (h("h4", { class: "list-header push-half-top flush-bottom text-gray-dark" }, "You haven't joined a group yet"));
        }
    }
    renderCallToAction() {
        if (this.user) {
            if (this.leader) {
                return this.contentBlockHandler.getContentBlock('group-list-leader');
            }
            else if (this.user.groups.length > 0) {
                return this.contentBlockHandler.getContentBlock('group-list-member');
            }
            else {
                return this.contentBlockHandler.getContentBlock('group-list-none');
            }
        }
    }
    render() {
        return (h("div", { class: "group-list" }, h("p", { class: "text-gray-light font-family-base" }, "my groups"), this.renderUserGroupState(), h("div", { class: "push-half-top groups-cta" }, h("strong", { class: "text-gray" }, "Hey ", this.user.nickName || this.user.firstName, "!"), " ", h("span", { class: "text-gray-light" }, this.renderCallToAction()))));
    }
    get host() { return getElement(this); }
    static get watchers() { return {
        "authToken": ["authTokenHandler"]
    }; }
    static get style() { return "* {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n.relative {\n  position: relative;\n}\n\n.overflow-hidden {\n  overflow: hidden;\n}\n\n.d-flex {\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.d-block {\n  display: block;\n}\n\n.d-inline {\n  display: inline;\n}\n\n.d-none {\n  display: none;\n}\n\n.align-items-center {\n  -ms-flex-align: center;\n  align-items: center;\n}\n\n.w-100 {\n  width: 100%;\n}\n\n.img-responsive {\n  display: block;\n  height: auto;\n  max-width: 100%;\n}\n\n.img-circle {\n  border-radius: 50%;\n}\n\nhr {\n  border: 0;\n  border-top: 1px solid #e7e7e7;\n  margin-bottom: 1rem;\n  margin-top: 1rem;\n}\n\n.font-family-base, .group .group-text .control-label, .groups-cta {\n  font-family: \"acumin-pro\", helvetica, arial, sans-serif !important;\n  font-weight: 300 !important;\n}\n\n.font-family-condensed-extra {\n  font-family: \"acumin-pro-extra-condensed\", sans-serif !important;\n  font-weight: 500 !important;\n}\n\n.text-white {\n  color: #fff !important;\n}\n\n.text-gray-dark {\n  color: #4d4d4d !important;\n}\n\n.text-gray-light {\n  color: #979797 !important;\n}\n\n.text-gray {\n  color: #737373 !important;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-uppercase.font-size-smaller {\n  font-size: 13px !important;\n  letter-spacing: 0.5px;\n}\n\n.font-size-base {\n  font-size: 16px !important;\n}\n\@media (min-width: 480px) {\n  .font-size-base {\n    font-size: 19px !important;\n  }\n}\n\n.font-size-large {\n  font-size: 19px !important;\n}\n\@media (min-width: 480px) {\n  .font-size-large {\n    font-size: 22px !important;\n  }\n}\n\n.font-size-smaller {\n  font-size: 14px !important;\n}\n\n.font-size-smallest {\n  font-size: 10px;\n}\n\n.font-weight-mid {\n  font-weight: 500;\n}\n\n.bg-charcoal {\n  background-color: #171717;\n}\n\n.flush {\n  margin: 0 !important;\n}\n\n.flush-bottom {\n  margin-bottom: 0 !important;\n}\n\n.flush-top {\n  margin-top: 0 !important;\n}\n\n.push-half-bottom {\n  margin-bottom: 12px !important;\n}\n\n.push-bottom {\n  margin-bottom: 24px !important;\n}\n\n.push-top {\n  margin-top: 24px;\n}\n\n.push-half-top {\n  margin-top: 12px !important;\n}\n\n.soft-quarter-top {\n  padding-top: 6px;\n}\n\n.component-header {\n  font-family: \"acumin-pro-extra-condensed\";\n  font-size: 2rem;\n  font-weight: 500;\n  line-height: 0.95;\n  text-transform: uppercase;\n}\n\@media (min-width: 480px) {\n  .component-header {\n    font-size: 2.125rem;\n  }\n}\n\n.list-header {\n  font-family: \"acumin-pro-extra-condensed\", sans-serif;\n  font-size: 1.5rem;\n  font-weight: 500;\n  text-transform: uppercase;\n}\n\n.card > a {\n  color: inherit;\n  display: block;\n  text-decoration: none;\n}\n.card img {\n  width: 100%;\n}\n\n.color-gray {\n  color: #737373;\n}\n\n.media-label {\n  display: -ms-flexbox;\n  display: flex;\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  padding: 6px 8px;\n}\n.media-label > *:not(:last-child) {\n  margin-right: 5px;\n}\n.media-label .icon {\n  fill: #fff;\n  height: 16px;\n  width: 12px;\n}\n\n.btn {\n  display: inline-block;\n  margin-bottom: 0;\n  font-weight: 300;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  -ms-touch-action: manipulation;\n  touch-action: manipulation;\n  cursor: pointer;\n  background-image: none;\n  border: 1px solid transparent;\n  padding: 8px 10px;\n  font-size: 16px;\n  line-height: 1.5;\n  border-radius: 4px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  border-radius: 4px;\n  line-height: 1;\n  margin-top: 5px;\n  margin-bottom: 5px;\n  font-size: 14px;\n  padding: 13px 16px;\n  text-decoration: none;\n}\n.btn.btn-gray-light {\n  color: #fff;\n  background-color: #979797;\n  border-color: #979797;\n}\n.btn.btn.btn-blue, .btn.btn.btn-primary {\n  color: #fff;\n  background-color: #3b6e8f;\n  border-color: #3b6e8f;\n}\n.btn.btn.btn-blue:hover, .btn.btn.btn-primary:hover {\n  background-color: #2c526b;\n  border-color: #294d64;\n}\n.btn.btn-gray-light.btn-outline {\n  background: transparent;\n  border-style: solid;\n  border-width: 1px;\n  color: #979797;\n}\n.btn.btn-gray-light.btn-outline:hover {\n  background-color: #979797;\n  color: #fff;\n}\n.btn.btn-sm {\n  font-size: 13px;\n  padding: 10px 16px 11px;\n}\n\n.label {\n  font-family: \"lexia\", serif;\n  font-size: 12px;\n  margin-top: 9px;\n  padding: 5px 6px 4px;\n  display: inline;\n  font-weight: 500 !important;\n  line-height: 1;\n  color: #4d4d4d;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.25em;\n  font-style: italic;\n}\n.label.label-info {\n  background-color: #b6dee6;\n}\n\n.skeleton {\n  overflow: hidden;\n  position: relative;\n}\n.skeleton .shimmer {\n  overflow: hidden;\n}\n.skeleton .shimmer::after {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  -webkit-transform: translateX(-100%);\n  transform: translateX(-100%);\n  background-image: linear-gradient(100deg, #f0f0f0 20%, rgba(255, 255, 255, 0.3) 30%, rgba(255, 255, 255, 0.7) 40%, #f0f0f0 50%);\n  -webkit-animation: shimmer 1.5s infinite;\n  animation: shimmer 1.5s infinite;\n  -webkit-animation-timing-function: ease;\n  animation-timing-function: ease;\n  content: \"\";\n}\n.skeleton .shimmer-reverse::after {\n  background-image: linear-gradient(100deg, white 20%, rgba(240, 240, 240, 0.3) 30%, rgba(240, 240, 240, 0.7) 40%, white 50%);\n}\n\n\@-webkit-keyframes shimmer {\n  to {\n    -webkit-transform: translateX(100%);\n    transform: translateX(100%);\n  }\n}\n\n\@keyframes shimmer {\n  to {\n    -webkit-transform: translateX(100%);\n    transform: translateX(100%);\n  }\n}\n.group-list {\n  border-top: 1px solid #e7e7e7;\n}\n.group-list p {\n  margin: 10px 0 20px 0;\n}\n\n.groups-cta span div {\n  display: inline;\n}\n.groups-cta strong {\n  font-weight: 600;\n}\n\n.group {\n  border-bottom: 1px solid #e7e7e7;\n}\n.group .group-text h4.list-header {\n  margin: 5px 0 0 0;\n}\n.group .group-text h4.list-header a {\n  color: #4d4d4d;\n  text-decoration: none;\n}\n.group .group-text .control-label {\n  font-size: 12px;\n  font-weight: 600 !important;\n  text-transform: uppercase;\n}\n.group .group-text .leader-tag {\n  margin: 10px 0;\n}\n.group .group-image {\n  height: 75px;\n  width: 75px;\n  margin-left: auto;\n  background-size: cover;\n  background-position: 0;\n  background-repeat: no-repeat;\n}\n.group .group-image.img-circle {\n  border: 0px;\n  -webkit-box-shadow: inset 0px 0px 0px 2px rgba(231, 231, 231, 0.4);\n  -moz-box-shadow: inset 0px 0px 0px 2px rgba(231, 231, 231, 0.4);\n  box-shadow: inset 0px 0px 0px 2px rgba(231, 231, 231, 0.4);\n  background-size: cover;\n}"; }
}

export { CrdsGroupList as crds_group_list };

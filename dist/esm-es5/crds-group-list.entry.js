var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { r as registerInstance, h, g as getElement } from './core-9036992e.js';
import { g as gql, C as CrdsApollo, a as ContentBlockHandler } from './contentBlocks-ba35feaa.js';
var GET_GROUPS = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  {\n    user {\n      firstName\n      nickName\n      groups (types: [\"Small Group\"], expired: false) {\n        id\n        name\n        image\n        url\n        endDate\n        meeting {\n          day\n          time\n          frequency\n        }\n        role {\n          name\n          id\n        }\n        type {\n          name\n          id\n        }\n      }\n    }\n  }\n"], ["\n  {\n    user {\n      firstName\n      nickName\n      groups (types: [\"Small Group\"], expired: false) {\n        id\n        name\n        image\n        url\n        endDate\n        meeting {\n          day\n          time\n          frequency\n        }\n        role {\n          name\n          id\n        }\n        type {\n          name\n          id\n        }\n      }\n    }\n  }\n"])));
var CrdsGroupList = /** @class */ (function () {
    function CrdsGroupList(hostRef) {
        registerInstance(this, hostRef);
        this.expanded = false;
    }
    CrdsGroupList.prototype.authTokenHandler = function (newValue, oldValue) {
        if (newValue !== oldValue) {
            this.apolloClient = CrdsApollo(newValue);
            this.getUserGroups();
        }
    };
    CrdsGroupList.prototype.componentWillLoad = function () {
        var _this = this;
        this.apolloClient = CrdsApollo(this.authToken);
        this.contentBlockHandler = new ContentBlockHandler(this.apolloClient, 'group list');
        this.contentBlockHandler.getCopy().then(function () {
            _this.host.forceUpdate();
        });
        this.getUserGroups();
    };
    CrdsGroupList.prototype.getUserGroups = function () {
        var _this = this;
        if (!this.authToken)
            return null;
        return this.apolloClient
            .query({ query: GET_GROUPS })
            .then(function (success) {
            _this.user = success.data.user;
            _this.leader = _this.user.groups.filter(function (group) { return group.role.name === 'Leader'; }).length > 0;
        })
            .catch(function (err) {
            _this.logError(err);
        });
    };
    CrdsGroupList.prototype.convertTime = function (time) {
        var arr = time.split(':');
        var suffix = arr[0] >= 12 ? 'PM' : 'AM';
        var hours = arr[0] % 12 || 12;
        var minutes = arr[1];
        return hours + ":" + minutes + " " + suffix;
    };
    CrdsGroupList.prototype.logError = function (err) {
        console.error(err);
    };
    CrdsGroupList.prototype.renderMeetingTime = function (group) {
        if (group.meeting.day)
            return group.meeting.day + " at " + this.convertTime(group.meeting.time) + ", " + group.meeting.frequency;
        else
            return 'Flexible Meeting Time';
    };
    CrdsGroupList.prototype.renderLeaderTag = function (group) {
        if (group.role.name === 'Leader') {
            return (h("p", { class: "leader-tag" }, h("span", { class: "label label-info" }, "Leader")));
        }
    };
    CrdsGroupList.prototype.renderGroupList = function () {
        var _this = this;
        var groups = !this.expanded && this.user.groups.length > 3 ? this.user.groups.slice(0, 3) : this.user.groups;
        return groups.map(function (group) {
            return (h("div", { class: "group d-flex push-half-bottom" }, h("div", { class: "group-text" }, h("h4", { class: "list-header" }, h("a", { href: group.url }, group.name)), h("p", { class: "control-label text-gray-light flush" }, _this.renderMeetingTime(group)), _this.renderLeaderTag(group)), h("div", { class: "push-half-bottom group-image img-responsive img-circle", style: {
                    backgroundImage: "url('https://" + group.image + "')\n                                 ,url('https://crossroads-media.imgix.net/images/avatar.svg')"
                } })));
        });
    };
    CrdsGroupList.prototype.renderUserGroupState = function () {
        if (this.user && this.user.groups.length > 0) {
            return [this.renderGroupList(), this.renderShowMoreLink()];
        }
        else {
            return this.contentBlockHandler.getContentBlock('group-list-none-header');
        }
    };
    CrdsGroupList.prototype.renderCallToAction = function () {
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
    };
    CrdsGroupList.prototype.renderGroupSkeleton = function () {
        return [1, 2, 3].map(function () { return (h("div", { class: "d-flex push-bottom" }, h("div", { class: "skeleton text-skeleton" }, h("div", { class: "title shimmer" }), h("div", { class: "subtitle shimmer" })), h("div", { class: "skeleton avatar-skeleton" }, h("div", { class: "shimmer" })))); });
    };
    CrdsGroupList.prototype.renderUserGreeting = function () {
        if (this.user) {
            return (h("div", { class: "push-half-top groups-cta" }, h("strong", { class: "text-gray" }, "Hey ", this.user.nickName || this.user.firstName, "!"), ' ', h("span", { class: "text-gray-light" }, this.renderCallToAction())));
        }
    };
    CrdsGroupList.prototype.renderShowMoreLink = function () {
        var _this = this;
        if (this.user.groups.length > 3)
            return (h("btn", { onClick: (function () { return _this.expanded = !_this.expanded; }), class: "btn btn-sm btn-gray-light btn-outline" }, this.user.groups.length > 3 && (this.expanded ? 'Show Less' : 'Show More')));
    };
    CrdsGroupList.prototype.render = function () {
        var _this = this;
        return (h("div", { class: "group-list" }, h("div", { class: "group-list-header text-gray-light font-family-base" }, this.contentBlockHandler.getContentBlock('group-list-header')), (function () {
            if (_this.user)
                return _this.renderUserGroupState();
            return _this.renderGroupSkeleton();
        })(), this.renderUserGreeting()));
    };
    Object.defineProperty(CrdsGroupList.prototype, "host", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CrdsGroupList, "watchers", {
        get: function () {
            return {
                "authToken": ["authTokenHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CrdsGroupList, "style", {
        get: function () { return "*{-webkit-box-sizing:border-box;box-sizing:border-box}.relative{position:relative}.overflow-hidden{overflow:hidden}.d-flex{display:-ms-flexbox;display:flex}.d-block{display:block}.d-inline{display:inline}.d-none{display:none}.align-items-center{-ms-flex-align:center;align-items:center}.w-100{width:100%}.img-responsive{display:block;height:auto;max-width:100%}.img-circle{border-radius:50%}hr{border:0;border-top:1px solid #e7e7e7;margin-bottom:1rem;margin-top:1rem}.btn,.font-family-base,.group .group-text .control-label,.groups-cta{font-family:acumin-pro,helvetica,arial,sans-serif!important;font-weight:300!important}.font-family-condensed-extra{font-family:acumin-pro-extra-condensed,sans-serif!important;font-weight:500!important}.text-white{color:#fff!important}.text-gray-dark{color:#4d4d4d!important}.text-gray-light{color:#979797!important}.text-gray{color:#737373!important}.text-center{text-align:center}.text-uppercase{text-transform:uppercase}.text-uppercase.font-size-smaller{font-size:13px!important;letter-spacing:.5px}.font-size-base{font-size:16px!important}\@media (min-width:480px){.font-size-base{font-size:19px!important}}.font-size-large{font-size:19px!important}\@media (min-width:480px){.font-size-large{font-size:22px!important}}.font-size-smaller{font-size:14px!important}.font-size-smallest{font-size:10px}.font-weight-mid{font-weight:500}.bg-charcoal{background-color:#171717}.flush{margin:0!important}.flush-bottom{margin-bottom:0!important}.flush-top{margin-top:0!important}.push-half-bottom{margin-bottom:12px!important}.push-bottom{margin-bottom:24px!important}.push-top{margin-top:24px}.push-half-top{margin-top:12px!important}.soft-quarter-top{padding-top:6px}.component-header{font-family:acumin-pro-extra-condensed;font-size:2rem;font-weight:500;line-height:.95;text-transform:uppercase}\@media (min-width:480px){.component-header{font-size:2.125rem}}.list-header{font-family:acumin-pro-extra-condensed,sans-serif;font-size:1.5rem;font-weight:500;text-transform:uppercase}.card>a{color:inherit;display:block;text-decoration:none}.card img{width:100%}.color-gray{color:#737373}.media-label{display:-ms-flexbox;display:flex;position:absolute;right:0;bottom:0;padding:6px 8px}.media-label>:not(:last-child){margin-right:5px}.media-label .icon{fill:#fff;height:16px;width:12px}.btn{display:inline-block;margin-bottom:0;font-weight:300;text-align:center;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;border:1px solid transparent;padding:8px 10px;font-size:16px;line-height:1.5;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border-radius:4px;line-height:1;margin-top:5px;margin-bottom:5px;font-size:14px;padding:13px 16px;text-decoration:none}.btn.btn-gray-light{color:#fff;background-color:#979797;border-color:#979797}.btn.btn.btn-blue,.btn.btn.btn-primary{color:#fff;background-color:#3b6e8f;border-color:#3b6e8f}.btn.btn.btn-blue:hover,.btn.btn.btn-primary:hover{background-color:#2c526b;border-color:#294d64}.btn.btn-gray-light.btn-outline{background:transparent;border-style:solid;border-width:1px;color:#979797}.btn.btn-gray-light.btn-outline:hover{background-color:#979797;color:#fff}.btn.btn-sm{font-size:13px;padding:10px 16px 11px}.btn.btn-block{display:block;width:100%}.label{font-family:lexia,serif;font-size:12px;margin-top:9px;padding:5px 6px 4px;display:inline;font-weight:500!important;line-height:1;color:#4d4d4d;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25em;font-style:italic}.label.label-info{background-color:#b6dee6}.skeleton{position:relative}.skeleton,.skeleton .shimmer{overflow:hidden}.skeleton .shimmer:after{position:absolute;top:0;right:0;bottom:0;left:0;-webkit-transform:translateX(-100%);transform:translateX(-100%);background-image:linear-gradient(100deg,#f0f0f0 20%,hsla(0,0%,100%,.3) 30%,hsla(0,0%,100%,.7) 40%,#f0f0f0 50%);-webkit-animation:shimmer 1.5s infinite;animation:shimmer 1.5s infinite;-webkit-animation-timing-function:ease;animation-timing-function:ease;content:\"\"}.skeleton .shimmer-reverse:after{background-image:linear-gradient(100deg,#fff 20%,hsla(0,0%,94.1%,.3) 30%,hsla(0,0%,94.1%,.7) 40%,#fff 50%)}.text-skeleton{width:100%}.text-skeleton .subtitle,.text-skeleton .title{background-color:#f0f0f0;overflow:hidden;position:relative}.text-skeleton .title{height:24px;margin-bottom:1rem;width:35%}.text-skeleton .subtitle{height:16px;width:50%}.avatar-skeleton{height:75px;width:75px;border-radius:50%;background-color:#f0f0f0;-ms-flex-negative:0;flex-shrink:0}.avatar-skeleton .shimmer:after{left:-400px;-webkit-animation:shimmer 1.5s .5s infinite;animation:shimmer 1.5s .5s infinite}\@-webkit-keyframes shimmer{to{-webkit-transform:translateX(100%);transform:translateX(100%)}}\@keyframes shimmer{to{-webkit-transform:translateX(100%);transform:translateX(100%)}}.group-list{border-top:1px solid #e7e7e7}.group-list p{margin:10px 0 20px 0}.groups-cta span div{display:inline}.groups-cta strong{font-weight:600}.group-list-header{min-height:28px;margin:10px 0}.group-list-header p{margin:0}.group{border-bottom:1px solid #e7e7e7}.group .group-text h4.list-header{margin:5px 0 0 0}.group .group-text h4.list-header a{color:#4d4d4d;text-decoration:none}.group .group-text .control-label{font-size:12px;text-transform:uppercase}.group .group-text .leader-tag{margin:10px 0}.group .group-image{height:75px;width:75px;margin-left:auto;background-size:cover;background-position:0;background-repeat:no-repeat;-ms-flex-negative:0;flex-shrink:0}.group .group-image.img-circle{border:0;-webkit-box-shadow:inset 0 0 0 2px hsla(0,0%,90.6%,.4);-moz-box-shadow:inset 0 0 0 2px hsla(0,0%,90.6%,.4);box-shadow:inset 0 0 0 2px hsla(0,0%,90.6%,.4);background-size:cover}"; },
        enumerable: true,
        configurable: true
    });
    return CrdsGroupList;
}());
export { CrdsGroupList as crds_group_list };
var templateObject_1;

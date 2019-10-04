import { h } from "@stencil/core";
import { CrdsApollo } from '../../shared/apollo';
import { GET_GROUPS } from './crds-group-list.graphql';
import { ContentBlockHandler } from '../../shared/contentBlocks/contentBlocks';
export class CrdsGroupList {
    constructor() {
        this.expanded = false;
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
        this.contentBlockHandler.getCopy().then(() => {
            this.host.forceUpdate();
        });
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
    convertTime(time) {
        const arr = time.split(':');
        var suffix = arr[0] >= 12 ? 'PM' : 'AM';
        var hours = arr[0] % 12 || 12;
        var minutes = arr[1];
        return `${hours}:${minutes} ${suffix}`;
    }
    logError(err) {
        console.error(err);
    }
    renderMeetingTime(group) {
        if (group.meeting.day)
            return `${group.meeting.day} at ${this.convertTime(group.meeting.time)}, ${group.meeting.frequency}`;
        else
            return 'Flexible Meeting Time';
    }
    renderLeaderTag(group) {
        if (group.role.name === 'Leader') {
            return (h("p", { class: "leader-tag" },
                h("span", { class: "label label-info" }, "Leader")));
        }
    }
    renderGroupList() {
        const groups = !this.expanded && this.user.groups.length > 3 ? this.user.groups.slice(0, 3) : this.user.groups;
        return groups.map(group => {
            return (h("div", { class: "group d-flex push-half-bottom" },
                h("div", { class: "group-text" },
                    h("h4", { class: "list-header" },
                        h("a", { href: group.url }, group.name)),
                    h("p", { class: "control-label text-gray-light flush" }, this.renderMeetingTime(group)),
                    this.renderLeaderTag(group)),
                h("div", { class: "push-half-bottom group-image img-responsive img-circle", style: {
                        backgroundImage: `url('https://${group.image}')
                                 ,url('https://crossroads-media.imgix.net/images/avatar.svg')`
                    } })));
        });
    }
    renderUserGroupState() {
        if (this.user && this.user.groups.length > 0) {
            return [this.renderGroupList(), this.renderShowMoreLink()];
        }
        else {
            return this.contentBlockHandler.getContentBlock('group-list-none-header');
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
    renderGroupSkeleton() {
        return [1, 2, 3].map(() => (h("div", { class: "d-flex push-bottom" },
            h("div", { class: "skeleton text-skeleton" },
                h("div", { class: "title shimmer" }),
                h("div", { class: "subtitle shimmer" })),
            h("div", { class: "skeleton avatar-skeleton" },
                h("div", { class: "shimmer" })))));
    }
    renderUserGreeting() {
        if (this.user) {
            return (h("div", { class: "push-half-top groups-cta" },
                h("strong", { class: "text-gray" },
                    "Hey ",
                    this.user.nickName || this.user.firstName,
                    "!"),
                ' ',
                h("span", { class: "text-gray-light" }, this.renderCallToAction())));
        }
    }
    renderShowMoreLink() {
        if (this.user.groups.length > 3)
            return (h("btn", { onClick: (() => this.expanded = !this.expanded), class: "btn btn-sm btn-gray-light btn-outline" }, this.user.groups.length > 3 && (this.expanded ? 'Show Less' : 'Show More')));
    }
    render() {
        const renderUserGroupState = this.user;
        return (h("div", { class: "group-list" },
            h("div", { class: "group-list-header text-gray-light font-family-base" }, this.contentBlockHandler.getContentBlock('group-list-header')),
            (() => {
                if (this.user)
                    return this.renderUserGroupState();
                return this.renderGroupSkeleton();
            })(),
            this.renderUserGreeting()));
    }
    static get is() { return "crds-group-list"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["crds-group-list.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["crds-group-list.css"]
    }; }
    static get properties() { return {
        "authToken": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "auth-token",
            "reflect": false
        }
    }; }
    static get states() { return {
        "user": {},
        "expanded": {}
    }; }
    static get elementRef() { return "host"; }
    static get watchers() { return [{
            "propName": "authToken",
            "methodName": "authTokenHandler"
        }]; }
}

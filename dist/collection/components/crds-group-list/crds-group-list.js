import { h } from '@stencil/core';
import { CrdsApollo } from '../../shared/apollo';
import { GET_GROUPS } from './crds-group-list.graphql';
import { ContentBlockHandler } from '../../shared/contentBlocks/contentBlocks';
export class CrdsGroupList {
    constructor() {
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
            return h("p", { class: "leader-tag" },
                h("span", { class: "label label-info" }, "Leader"));
        }
    }
    renderGroupList() {
        return this.user.groups.map(group => {
            if (this.validGroups.includes(group.type.name)) {
                return (h("div", { class: "group d-flex push-half-bottom" },
                    h("div", { class: "group-text" },
                        h("h4", { class: "list-header" },
                            h("a", { href: "#" }, group.name)),
                        h("p", { class: "control-label text-gray-light flush" },
                            group.meeting.day,
                            " at ",
                            group.meeting.time,
                            ", ",
                            group.meeting.frequency),
                        this.renderLeaderTag(group)),
                    h("div", { class: "push-half-bottom group-image img-responsive img-circle", style: {
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
        return (h("div", { class: "group-list" },
            h("p", { class: "text-gray-light font-family-base" }, "my groups"),
            this.renderUserGroupState(),
            h("div", { class: "push-half-top groups-cta" },
                h("strong", { class: "text-gray" },
                    "Hey ",
                    this.user.nickName || this.user.firstName,
                    "!"),
                " ",
                h("span", { class: "text-gray-light" }, this.renderCallToAction()))));
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
        "user": {}
    }; }
    static get elementRef() { return "host"; }
    static get watchers() { return [{
            "propName": "authToken",
            "methodName": "authTokenHandler"
        }]; }
}

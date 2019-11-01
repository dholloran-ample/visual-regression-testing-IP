import { Component, Prop, State, Element, Watch, h } from '@stencil/core';
import { SET_SITE, GET_COPY } from './crds-site-select.graphql';
import { CrdsApollo } from '../../shared/apollo';
import { Utils } from '../../shared/utils';
import { ApolloClient } from 'apollo-client';
import toastr from 'toastr';


@Component({
    tag: 'crds-site-select',
    styleUrl: 'crds-site-select.scss',
    shadow: true
})
export class CrdsSiteSelect {
    public apolloClient: ApolloClient<{}>;

    @Prop() authToken: string;
    @Prop() siteId: string;
    @Prop() siteSelectConfirmationCopy: any;

    @State() cookieSite: string;

    @Watch('authToken')
    authTokenHandler(newValue: string, oldValue: string) {
        if (newValue !== oldValue) {
            this.apolloClient = CrdsApollo(newValue);
        }
    }

    public componentWillLoad() {
        toastr.options.escapeHtml = false;
        this.apolloClient = CrdsApollo(this.authToken);
        this.cookieSite = Utils.getCookie('nearestSiteId');
        this.getContentBlockContent("site select", "siteSelectConfirmation");
    }

    private getContentBlockContent(contentBlockCategory, contentBlockSlug) {
        return this.apolloClient
            .query({
                variables: { categoryDescription: contentBlockCategory },
                query: GET_COPY
            })
            .then(response => {
                let numberOfContentBlocksInCategory = response.data.contentBlocks.length;
                for (let i = 0; i < numberOfContentBlocksInCategory; i++) {
                    if (response.data.contentBlocks[i].slug === contentBlockSlug) {
                        this.siteSelectConfirmationCopy = response.data.contentBlocks[i].content;
                    }
                }
            })
            .catch(err => {
                this.logError(err);
            });
    }

    private setUserSite() {
        if (this.authToken) {
            this.setMpSite()
        }
        else {
            this.setCookieSite()
        }
    }

    private setMpSite() {
        return this.apolloClient
            .mutate({
                variables: { siteId: this.siteId },
                mutation: SET_SITE
            })
            .then(() => {
                toastr.success(
                    this.siteSelectConfirmationCopy
                );
            })
            .catch(err => {
                this.logError(err);
            });
    }

    private setCookieSite() {
        console.log('TODO: setCookieSite')
        // should we save this to Cosmos? (how is it done in MySite?)
        Utils.setCookie('nearestSiteId', this.siteId, 365);
    }

    private logError(err) {
        console.error(err)
    }

    public render() {
        return (
            <button onClick={() => this.setUserSite()}>Set as my site</button >
        )
    }

}
import { Component, Prop, State, Element, Watch, h } from '@stencil/core';
import ApolloClient from 'apollo-client';
import { CrdsApollo } from '../../shared/apollo';

@Component({
    tag: 'crds-site-select',
    styleUrl: 'crds-site-select.scss',
    shadow: true
})
export class CrdsSiteSelect {
    private apolloClient: ApolloClient<{}>;

    @Prop() authToken: string;

    @Watch('authToken')
    authTokenHandler(newValue: string, oldValue: string) {
        if (newValue !== oldValue) {
            this.apolloClient = CrdsApollo(newValue);
        }
    }

    public render(){
        <button>this thing</button>
    }

}
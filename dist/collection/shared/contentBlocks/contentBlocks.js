import { h } from '@stencil/core';
import { GET_COPY } from './contentBlock.graphql';
export class ContentBlockHandler {
    constructor(apolloClient, componentName) {
        this.copy = [];
        this.apolloClient = apolloClient;
        this.componentName = componentName;
    }
    getCopy() {
        return this.apolloClient
            .query({ query: GET_COPY, variables: { componentName: this.componentName } })
            .then(response => {
            this.copy = response.data.contentBlocks;
            return response.data.contentBlocks;
        });
    }
    getContentBlock(slug) {
        if (!this.copy)
            return null;
        const contentBlock = this.copy.find(c => c.slug === slug);
        if (!contentBlock)
            return;
        return h("div", { innerHTML: contentBlock.content.toString() });
    }
}

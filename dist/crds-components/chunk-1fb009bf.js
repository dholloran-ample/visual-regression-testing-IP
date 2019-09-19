import { h } from './chunk-67523e50.js';
import { g as gql } from './chunk-04a07178.js';

const GET_COPY = gql `
query contentBlocks($componentName: String) {
  contentBlocks(filters: { category: $componentName }) {
    content
    slug
  }
}
`;

class ContentBlockHandler {
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

export { ContentBlockHandler as C };

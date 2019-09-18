import { ApolloClient } from 'apollo-client';
export declare class ContentBlockHandler {
    private copy;
    private componentName;
    private apolloClient;
    constructor(apolloClient: ApolloClient<{}>, componentName: string);
    getCopy(): Promise<ContentBlock[]>;
    getContentBlock(slug: string): HTMLDivElement;
}
export interface ContentBlock {
    slug: string;
    content: string;
}

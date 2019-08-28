import { ApolloClient, DefaultOptions } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import * as fetch from 'node-fetch';
import isNode from 'detect-node';

export function CrdsApollo(authToken: string): ApolloClient<{}> {
    const defaultOptions: DefaultOptions = {
        watchQuery: {
            fetchPolicy: 'no-cache',
        },
        query: {
            fetchPolicy: 'no-cache',
        },
    }
    
    const httpLink = createHttpLink({
        uri: process.env.CRDS_GQL_ENDPOINT,
        ...(isNode && { fetch: fetch })
    });

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: authToken
            }
        }
    });

    return new ApolloClient({
        link: authLink.concat(httpLink),
        defaultOptions: defaultOptions,
        cache: new InMemoryCache()
    });
}

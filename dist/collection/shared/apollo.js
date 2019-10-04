import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import * as fetch from 'node-fetch';
import isNode from 'detect-node';
export function CrdsApollo(authToken) {
    const defaultOptions = {
        watchQuery: {
            fetchPolicy: 'no-cache',
        },
        query: {
            fetchPolicy: 'no-cache',
        },
    };
    const httpLink = createHttpLink(Object.assign({ uri: process.env.CRDS_GQL_ENDPOINT }, (isNode && { fetch: fetch })));
    const authLink = setContext((_, { headers }) => {
        return {
            headers: Object.assign(Object.assign({}, headers), { authorization: authToken })
        };
    });
    return new ApolloClient({
        link: authLink.concat(httpLink),
        defaultOptions: defaultOptions,
        cache: new InMemoryCache()
    });
}

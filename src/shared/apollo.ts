import { ApolloClient, DefaultOptions } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';

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
    });

    const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        // return the headers to the context so httpLink can read them
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


import { ApolloClient } from 'apollo-client';
import { getApolloClient } from '../global/apollo';

export class CrdsApolloService {
  public static apolloClient: ApolloClient<{}>;

  public static initApolloClient(): Promise<ApolloClient<{}>> {
    const clientSubject = getApolloClient();
    return new Promise(resolve => {
      clientSubject.subscribe(client => {
        this.apolloClient = client;
        resolve(client);
      });
    });
  }
}

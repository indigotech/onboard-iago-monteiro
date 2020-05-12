import { InMemoryCache, HttpLink, ApolloClient } from 'apollo-boost'
import { setContext } from 'apollo-link-context';

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
});

export const client = new ApolloClient({
    cache: cache,
    link: link
});

export const clientWithAuth = (token : any) => {

    const authLink = setContext((_, { headers }) => {
        
        // return the headers to the context so httpLink can read them
        return {
          headers: {
            ...headers,
            authorization: token
          }
        }
      });
      
      return new ApolloClient({
        link: authLink.concat(link),
        cache: cache
      });
}


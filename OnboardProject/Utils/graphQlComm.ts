import { InMemoryCache, HttpLink, ApolloClient } from 'apollo-boost'
import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag'

const loginMutation = (email: string, password: string) => {
    return (
        gql`mutation Login{
                login(data: {email: "${email}" password: "${password}"}){
                    token
                    user{
                        id
                        name
                    }
                }
            }`
    );
}

const usersQuery = (offset: number, limit: number) => {
    return (
        gql`query users{
                users(pageInfo: {offset: ${offset}, limit: ${limit}}){
                    nodes{
                        id
                        name
                        phone
                        birthDate
                        email
                        role
                    }
                    count
                    pageInfo{
                        offset
                        limit
                        hasNextPage
                        hasPreviousPage
                    }
                }
            }`
    );
}

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
});


const client = new ApolloClient({
    cache: cache,
    link: link
});

const clientWithAuth = (token : any) => {

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

export { client, clientWithAuth, loginMutation, usersQuery };
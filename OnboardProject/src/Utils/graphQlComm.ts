import { InMemoryCache, HttpLink, ApolloClient } from 'apollo-boost'
import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag'

const loginMutation = 
        gql`mutation Login($data:LoginInputType!){
                login(data: $data){
                    token
                    user{
                        id
                        name
                    }
                }
            }`;
    


const usersQuery = 
        gql`query Users($pageInfo:PageInputType!){
                users(pageInfo: $pageInfo){
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
            }`;



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
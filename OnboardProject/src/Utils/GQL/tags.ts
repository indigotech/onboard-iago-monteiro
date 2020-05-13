import gql from 'graphql-tag'

export const loginMutation =
  gql`mutation Login($data:LoginInputType!){
        login(data: $data){
          token
          user{
            id
            name
          }
        }
      }`;



export const usersQuery =
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

export const createUsersMutation =
  gql`mutation user($data: UserInputType!){
        createUser(data: $data){
          id
          name
        }
      }`;

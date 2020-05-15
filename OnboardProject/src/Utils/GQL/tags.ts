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
            email
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

export const getUserQuery =
  gql`query user($id: ID!){
    user(id:$id){
      name
      phone
      birthDate
      email
      role
    }
  }
  `;

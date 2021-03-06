export interface UserInputType {
  name: string,
  phone: string,
  birthDate: string,
  email: string,
  role: string,
  password:string
}

export interface UserDetailsType {
  name: string,
  phone: string,
  birthDate: string,
  email: string,
  role: string,
  __typename:string
}

export interface UserType {
  id: string,
  name: string,
  phone: string,
  birthDate: string,
  email: string,
  role: string
}
export interface createUserResponseType {
  createUser: UserType
}

export interface PaginatedUsersType{
  users: {
      nodes: UserType[],
      count: number,
      pageInfo: {
          offset: number,
          limit: number,
          hasNextPage: boolean,
          hasPreviousPage: boolean
      }
  }
}

export interface LoginResponse{
  login: {
    token:string,
    user: UserType
  }
}

export interface GetUserResponseType{
  user:{
    name:string,
    birthDate:string,
    email:string,
    phone:string,
    role:string,
    __typename:string
  }
}

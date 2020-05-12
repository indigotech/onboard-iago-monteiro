
export interface UserType {
    id: string,
    name: string,
    phone: string,
    birthDate: string,
    email: string,
    role: string,
    __typename: string
}

export interface UsersResponseType{
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
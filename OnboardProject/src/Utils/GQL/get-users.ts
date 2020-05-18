import { retrieveData } from '../local-storage';
import {clientWithAuth} from './clients';
import {usersQuery} from './tags';
import { PaginatedUsersType } from './types';

export const getUsers = (offset:number,limit:number) => {
    return retrieveData("AUTH_TOKEN").then((token) => {

        return clientWithAuth(token).query<PaginatedUsersType>({
            query: usersQuery,
            variables: {pageInfo: { offset, limit }}
        });
    });
}

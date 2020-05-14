import { retrieveData } from '../LocalStorage';
import {clientWithAuth} from './clients';
import {getUserQuery} from './tags';
import { GetUserResponseType } from './types';

export const getUser = (id:string) => {
    return retrieveData("AUTH_TOKEN").then((token) => {

        return clientWithAuth(token).query<GetUserResponseType>({
            query: getUserQuery,
            variables: {id},
            errorPolicy: 'all'
        });
    });
}

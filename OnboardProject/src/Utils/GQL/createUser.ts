import { retrieveData } from '../LocalStorage';
import {clientWithAuth} from './clients';
import {createUsersMutation} from './tags';
import { UserInputType, createUserResponseType } from './types';

export const createUser = (data:UserInputType) => {
    return retrieveData("AUTH_TOKEN").then((token) => {

        return clientWithAuth(token).mutate<createUserResponseType>({
            mutation: createUsersMutation,
            variables: {data},
            errorPolicy: 'all'
        });
    });
}

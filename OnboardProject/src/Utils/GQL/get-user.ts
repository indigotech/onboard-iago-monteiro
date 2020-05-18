import { retrieveData } from '../local-storage';
import {clientWithAuth} from './clients';
import {getUserQuery} from './tags';
import { GetUserResponseType } from './types';
//import * as jwt from 'jsonwebtoken';

export const getUser = (id:string) => {
    return retrieveData("AUTH_TOKEN").then((token) => {
        // jwt.verify(token, 'shhhhh', function(err, decoded) {
        //     console.log(decoded) // bar
        //   });
        return clientWithAuth(token).query<GetUserResponseType>({
            query: getUserQuery,
            variables: {id},
            errorPolicy: 'all'
        });
    });
}

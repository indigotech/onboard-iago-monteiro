import { retrieveData } from '../LocalStorage';
import {clientWithAuth} from './clients';
import {usersQuery} from './tags';
import { UsersResponseType } from './types';

export const getUsers = (offset:number,limit:number) => {
    return retrieveData("AUTH_TOKEN").then((token) => {

        return clientWithAuth(token).query<UsersResponseType>({
            query: usersQuery,
            variables: {pageInfo: { offset, limit }} 
        });
    });
}
//     }).then((result) => {

//         result.data.users.nodes.map((user: UserType) => {
//             currentUsers.push(user);
//         });

//         // this.setState({ users: currentUsers, usersCount: result.data.users.count });
//         // this.setState({ isLastPage: !result.data.users.pageInfo.hasNextPage })
//         // this.setState((state, props) => ({ currentPage: state.currentPage + 1 }));
//         this.setState((state) => ({
//             users: currentUsers, 
//             usersCount: result.data.users.count,
//             isLastPage: !result.data.users.pageInfo.hasNextPage,
//             currentPage: state.currentPage + 1
//         }));
        
//     }).catch((erro) => {
//         console.log(erro);
//     });
// });
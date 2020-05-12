import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import {getUsers} from '../../Utils/GQL/getUsers';
import { UserType } from '../../Utils/GQL/types';
import { styles, getLoadMoreButtonColor } from './UsersStyles';

interface UsersPageState {
    users: UserType[],
    currentPage: number,
    isLastPage: boolean,
    usersCount: number
}

class UsersPage extends React.Component<{}, UsersPageState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            users: [],
            currentPage: 0,
            usersCount: 0,
            isLastPage: false
        }

        this.fetchData();
    }

    private fetchData = () => {

        if (this.state.isLastPage) {
            return;
        }

        const limit = 10;
        const offset = this.state.currentPage * limit;

        getUsers(offset,limit).then((result) => {
            console.log("Result is back.");

            let currentUsers = [...this.state.users];
            
            result.data.users.nodes.map((user: UserType) => {
                currentUsers.push(user);
            });
            
            this.setState((state) => ({
                users: currentUsers, 
                usersCount: result.data.users.count,
                isLastPage: !result.data.users.pageInfo.hasNextPage,
                currentPage: state.currentPage + 1
            }));

        }).catch((erro) => {
            console.log(erro);
        })

        // retrieveData("AUTH_TOKEN").then((token) => {

        //     let currentUsers = [...this.state.users];

        //     clientWithAuth(token).query<UsersResponseType>({
        //         query: query,
        //         variables: {pageInfo: { offset, limit }} 
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

    }

    render() {

        const usersData = this.state.users.map((user) => {
            return (
                <View key={user.id}>
                    <Text style={styles.sectionHeader}>{user.role} : {user.name}</Text>
                    <Text style={styles.userInfo}> {user.email}</Text>
                    <Text style={styles.userInfo}>{user.birthDate}</Text>
                    <Text style={styles.userInfo}>{user.phone}</Text>
                </View>
            )
        });

        const loadMoreButtonColor = getLoadMoreButtonColor(this.state.isLastPage);

        return (
            <ScrollView>
                {usersData}
                <Text onPress={this.fetchData} style={[styles.loadMoreButton, loadMoreButtonColor]}>
                    Load More
                </Text>
            </ScrollView>
        );

    }
}

export { UsersPage };
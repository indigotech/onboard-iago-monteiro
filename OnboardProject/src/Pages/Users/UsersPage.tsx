import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { retrieveData } from '../../Utils/LocalStorage';
import { clientWithAuth } from '../../Utils/graphQlComm';
import { usersQuery } from '../../Utils/graphQlComm';
import { styles } from './UsersStyles';

export interface UserType {
    id: string,
    name: string,
    phone: string,
    birthDate: string,
    email: string,
    role: string,
    __typename: string
}
interface UsersResponseType{
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

    fetchData = () => {

        if (this.state.isLastPage) {
            return;
        }

        const limit = 10;
        const offset = this.state.currentPage * limit;

        const query = usersQuery;

        retrieveData("AUTH_TOKEN").then((token) => {

            this.setState((state, props) => ({ currentPage: state.currentPage + 1 }));

            let currentUsers = [...this.state.users];

            clientWithAuth(token).query<UsersResponseType>({
                query: query,
                variables: {pageInfo: { offset, limit }} 
            }).then((result) => {

                result.data.users.nodes.map((user: UserType) => {
                    currentUsers.push(user);
                });

                this.setState({ users: currentUsers, usersCount: result.data.users.count });
                this.setState({ isLastPage: !result.data.users.pageInfo.hasNextPage })

            }).catch((erro) => {
                console.log(erro);
            });
        });

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

        const loadMoreButtonColor = {
            color:
                (this.state.isLastPage) ? 'grey' : 'blue'
        };

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
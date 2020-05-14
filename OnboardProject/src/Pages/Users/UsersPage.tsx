import { View, Text, ScrollView, Alert } from 'react-native';
import React from 'react';
import { getUsers } from '../../Utils/GQL/getUsers';
import { UserType } from '../../Utils/GQL/types';
import { styles, getLoadMoreButtonColor } from './UsersStyles';
import {UserDetailsList} from '../../Components/UserDetails/UserDetailsList';
import {AddUserButton} from '../../Components/Floating Action Button/AddUserButton';

interface UsersPageState {
  users: UserType[],
  currentPage: number,
  isLastPage: boolean,
  usersCount: number
}

interface UsersPageProps {
  componentId: string
}

class UsersPage extends React.Component<UsersPageProps, UsersPageState> {

  constructor(props: UsersPageProps) {
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

    getUsers(offset, limit).then((result) => {

      const currentUsers = this.state.users.concat(result.data.users.nodes);

      this.setState((state) => ({
        users: currentUsers,
        usersCount: result.data.users.count,
        isLastPage: !result.data.users.pageInfo.hasNextPage,
        currentPage: state.currentPage + 1
      }));

    }).catch((erro) => {

      Alert.alert("Houve um erro para obter usuários", erro.graphQLErrors?.[0]?.message);
    })
  }

  render() {

    const usersData = this.state.users.map((user) => {
      return (
        <UserDetailsList key={user.id} user={user} componentId={this.props.componentId}></UserDetailsList>
      )
    });

    const loadMoreButtonColor = getLoadMoreButtonColor(this.state.isLastPage);

    return (

      <View style={{flex:1}}>

        <ScrollView>
          {usersData}
          <Text onPress={this.fetchData} style={[styles.loadMoreButton, loadMoreButtonColor]}>
            Load More
          </Text>
        </ScrollView>
        <AddUserButton componentId={this.props.componentId}></AddUserButton>
      </View>
    );
  }
}

export { UsersPage};

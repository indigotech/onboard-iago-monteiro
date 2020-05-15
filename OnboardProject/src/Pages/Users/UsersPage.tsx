import { View, Text, ScrollView, Alert } from 'react-native';
import React from 'react';
import { getUsers } from '../../utils/gql/get-users';
import { UserType } from '../../utils/gql/types';
import { styles, getLoadMoreButtonColor } from './UsersStyles';
import {UserDetailsList} from '../../components/user-details/UserDetailsList';
import {AddUserButton} from '../../components/floating-action-button/AddUserButton';
import { Navigation } from 'react-native-navigation';

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

  componentDidMount = () => {
    this.fetchData();
  }

  private handleAddUser = () => {

    Navigation.push(this.props.componentId, {
      component: {
        name: 'AddUsers',
        options: {
          topBar: {
            title: {
              text: 'Cadastrar Novo usuário'
            }
          }
        }
      }
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
        <AddUserButton navigateFunction={this.handleAddUser}></AddUserButton>
      </View>
    );
  }
}

export { UsersPage};

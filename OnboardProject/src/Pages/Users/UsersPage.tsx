import { View, Text, ScrollView, Alert } from 'react-native';
import React from 'react';
import { getUsers } from '../../utils/gql/get-users';
import { UserType } from '../../utils/gql/types';
import {UserDetailsList} from '../../components/user-details/user-details-list.component';
import {AddUserButton} from '../../components/atomic/floating-action-button/floating-action-button.component';
import { Navigation } from 'react-native-navigation';
import LoadMoreButton from '../../components/atomic/atm.button/button-load-more.component';

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

  //Ação do Botão Load More
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

      const error = erro.graphQLErrors?.[0]?.message;
      Alert.alert("Houve um erro para obter usuários", error);
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

    return (

      <View style={{flex:1}}>

        <ScrollView>
          {usersData}
          <LoadMoreButton onPress={this.fetchData} isLastPage={this.state.isLastPage}/>
        </ScrollView>
        <AddUserButton navigateFunction={this.handleAddUser}></AddUserButton>
      </View>
    );
  }
}

export { UsersPage};

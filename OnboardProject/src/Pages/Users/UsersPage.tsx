import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { getUsers } from '../../Utils/GQL/getUsers';
import { UserType } from '../../Utils/GQL/types';
import { styles, getLoadMoreButtonColor } from './UsersStyles';
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

    this.fetchData();
  }

  private fetchData = () => {

    if (this.state.isLastPage) {
      return;
    }

    const limit = 10;
    const offset = this.state.currentPage * limit;

    getUsers(offset, limit).then((result) => {

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
  }

  handleAddUser = () => {

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
        <View key={user.id} style={styles.userContainer}>
          <Text style={styles.sectionHeader}>{user.role} : {user.name}</Text>
          <Text style={styles.userInfo}> {user.email}</Text>
          <Text style={styles.userInfo}>{user.birthDate}</Text>
          <Text style={styles.userInfo}>{user.phone}</Text>
        </View>
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
        <View>
          <TouchableOpacity style={styles.TouchableOpacityStyle} onPress={this.handleAddUser}>
            <Image source={{
              uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
            }}
              style={styles.FloatingButtonStyle}
            />
          </TouchableOpacity>
        </View>

      </View>

    );

  }
}

export { UsersPage};

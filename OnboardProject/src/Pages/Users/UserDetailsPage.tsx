import React from 'react';
import {getUser} from '../../Utils/GQL/getUser';
import { styles } from './UsersStyles';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { UserDetailsType } from 'src/Utils/GQL/types';

interface UserDetailsProps {
  id:string
}
interface UserDetailsState {
  user: UserDetailsType
}
class UserDetailsPage extends React.Component<UserDetailsProps,UserDetailsState>{
  constructor(props : UserDetailsProps){
    super(props);
    this.state = {
      user:undefined
    }

    this.fetchUser();
  }

  private fetchUser = () => {
    getUser(this.props.id).then((result) => {
      console.log(result.data.user);
      if(result.data){
        console.log("Settar user");
        this.setState({
          user: result.data.user
        })
      }

    }).catch((erro) => {

      Alert.alert("Houve um erro para obter usuário", JSON.stringify(erro));
    });
  }
  render() {

    return (
      <View style={styles.userContainer}>
        <Text style={styles.sectionHeader}>{this.state.user?.role + ":"
          || ""}{this.state.user?.name || ""}</Text>
        <Text style={styles.userInfo}> {this.state.user?.email || ""}</Text>
        <Text style={styles.userInfo}> {this.state.user?.birthDate || ""}</Text>
        <Text style={styles.userInfo}> {this.state.user?.phone || ""}</Text>
      </View>
    );
  }
}

export {UserDetailsPage}

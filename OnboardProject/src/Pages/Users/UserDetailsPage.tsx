import React from 'react';
import {getUser} from '../../utils/gql/get-user';
import { styles } from './UsersStyles';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { UserDetailsType } from 'src/utils/gql/types';
import {UserDetails} from '../../components/user-details/user-details.component';

interface UserDetailsProps {
  id:string
}
interface UserDetailsState {
  user: UserDetailsType,
  carregando:boolean
}
class UserDetailsPage extends React.Component<UserDetailsProps,UserDetailsState>{
  
  constructor(props : UserDetailsProps){
    super(props);
    this.state = {
      user:undefined,
      carregando:true
    }
  }

  componentDidMount = () => {
    this.fetchUser();
  }

  private fetchUser = () => {
    getUser(this.props.id).then((result) => {
      console.log(result);
      if(result.data){
  
        this.setState({
          user: result.data.user
        })
      }

    }).catch((erro) => {

      const message = erro.graphQLErrors?.[0]?.message || erro.netwokError?.message;
      Alert.alert("Houve um erro para obter usuário", message);
    }).finally(() => {
      this.setState({
        carregando:false
      });
    });
  }
  
  render() {

    return (
      <UserDetails user={this.state.user} carregando={this.state.carregando}></UserDetails>
    );
  }
}

export {UserDetailsPage}

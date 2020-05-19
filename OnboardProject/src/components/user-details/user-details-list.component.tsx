import {StyledTouchableOpacity, StyledSectionHeader, StyledUserInfo} from './user-details.style';
import React from 'react';
import { UserType } from 'src/utils/gql/types';
import { Navigation } from 'react-native-navigation';

interface UserDetailsListProps {
  user: UserType,
  componentId: string
}

class UserDetailsList extends React.Component<UserDetailsListProps,{}>{
  constructor(props: UserDetailsListProps){
    super(props);
  }

  private handleGetUser = (id:string) => {

    Navigation.push(this.props.componentId, {
      component: {
        name: 'UserDetails',
        passProps:{
          id:id
        },
        options: {
          topBar: {
            title: {
              text: 'Detalhes'
            }
          }
        }
      }
    })
  }
  render() {
    return (
      <StyledTouchableOpacity onPress={this.handleGetUser.bind(this,this.props.user.id)}>
        <StyledSectionHeader>{this.props.user.name}</StyledSectionHeader>
        <StyledUserInfo>{this.props.user.email}</StyledUserInfo>
      </StyledTouchableOpacity>
    )
  }
}

export {UserDetailsList}

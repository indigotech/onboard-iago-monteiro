import {StyledView, StyledSectionHeader, StyledUserInfo} from './styledComponents';
import React from 'react';
import { UserDetailsType } from 'src/Utils/GQL/types';


interface UserDetailsProps {
  user: UserDetailsType,
  carregando:boolean
}

class UserDetails extends React.Component<UserDetailsProps,{}>{
  constructor(props: UserDetailsProps){
    super(props);
  }

  render() {
    return (
      this.props.carregando ? <StyledSectionHeader> Aguarde...</StyledSectionHeader> :
        <StyledView>
        <StyledSectionHeader>{this.props.user.role} : {this.props.user.name}</StyledSectionHeader>
        <StyledUserInfo>{this.props.user.email}</StyledUserInfo>
        <StyledUserInfo>{this.props.user.birthDate}</StyledUserInfo>
        <StyledUserInfo>{this.props.user.phone}</StyledUserInfo>
      </StyledView>
    )
  }
}

export {UserDetails}

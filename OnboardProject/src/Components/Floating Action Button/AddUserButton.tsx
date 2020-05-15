import React from 'react';
import {StyledTouchableOpacity, StyledImage} from './styledComponents';
import { Navigation } from 'react-native-navigation';
import { View } from 'react-native';

interface AddUserButtonProps {
  componentId: string
}

class AddUserButton extends React.Component<AddUserButtonProps,{}> {
  constructor(props: AddUserButtonProps){
    super(props);
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
    return(
      <View>
        <StyledTouchableOpacity onPress={this.handleAddUser}>
          <StyledImage source={{
              uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png'}}>
          </StyledImage>
        </StyledTouchableOpacity>
      </View>
    );
  }
}

export {AddUserButton}

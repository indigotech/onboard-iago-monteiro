import React from 'react';
import {TouchableOpacityStyled, ImageStyled} from './floating-action-button.component.style';

import { View } from 'react-native';

interface AddUserButtonProps {
  navigateFunction: () => void
}

class AddUserButton extends React.Component<AddUserButtonProps,{}> {
  constructor(props: AddUserButtonProps){
    super(props);
  }

  

  render() {
    return(
      <View>
        <TouchableOpacityStyled onPress={this.props.navigateFunction}>
          <ImageStyled source={{
              uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png'}}>
          </ImageStyled>
        </TouchableOpacityStyled>
      </View>
    );
  }
}

export {AddUserButton}

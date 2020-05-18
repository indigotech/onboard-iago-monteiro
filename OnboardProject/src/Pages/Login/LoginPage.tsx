import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { client } from '../../utils/gql/clients';
import { storeData } from '../../utils/local-storage';
import { Navigation } from 'react-native-navigation';
import { styles, getFormButtonTextAndColor } from '../global-styles';
import { LoginResponse} from '../../utils/gql/types';
import { loginMutation } from '../../utils/gql/tags';
import {checkEmailFormat, checkPasswordFormat} from '../../utils/input-validation';

interface LoginState {
  email: string,
  password: string,
  errorMessage: string,
  hasErrorMessage: boolean,
  isLoading: boolean
}

interface LoginPageProps {
  componentId: string
}

class LoginPage extends React.Component<LoginPageProps, LoginState>{

  constructor(props: LoginPageProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      hasErrorMessage: false,
      isLoading: false
    };
  }

  handleLogin = () => {

    if(this.state.isLoading){
      return;
    }

    const invalidEmail = checkEmailFormat(this.state.email);
    const invalidPassword = checkPasswordFormat(this.state.password);

    if(invalidEmail || invalidPassword){
      this.setState({hasErrorMessage: true, errorMessage: (invalidEmail || invalidPassword || "")});

      return;
    }

    this.setState({ isLoading: true });
    
    //Parâmetros da mutation
    const login = loginMutation;
    const email = this.state.email;
    const password = this.state.password;

    client.mutate<LoginResponse>({ 
      mutation: login, 
      variables: {data: {email ,password}}
    }).then((result) => {

      const token = result.data?.login.token;
      storeData("AUTH_TOKEN", token);

      this.setState({ hasErrorMessage: false, errorMessage: "" });

      Navigation.push(this.props.componentId, {
        component: {
          name: 'Users',
          options: {
            topBar: {
              title: {
                text: 'Usuários'
              }
            }
          }
        }
      });

    }).catch((error) => {
      
      const errorMessage = error.graphQLErrors?.[0]?.message || "Houve um erro. Tente novamente.";
      console.log(error.graphQLErrors?.[0]?.message);
    
      this.setState({ hasErrorMessage: true, errorMessage: errorMessage });
    
    }).finally(() => {
      this.setState({ isLoading: false });
    });
  }

  onEmailChange = (value:string) => this.setState({ email: value });
  onPasswordChange = (value:string) => this.setState({ password: value });

  render() {

    const {text, color} = getFormButtonTextAndColor(this.state.isLoading);
    let buttonTextStyles = [color,styles.buttonText];

    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Bem-vindo à Taqtile!</Text>
        <View style={styles.inputNameView}>
          <Text style={styles.inputName}>E-mail</Text>
        </View>
        <TextInput style={styles.textInput} onChangeText={this.onEmailChange} />
        <View style={styles.inputNameView}>
          <Text style={styles.inputName}>Senha</Text>
        </View>
        <TextInput style={styles.textInput} onChangeText={this.onPasswordChange}
          secureTextEntry={true} />
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={buttonTextStyles}>
            {text}
          </Text>
        </TouchableOpacity>

        <View style={{ width: '80%', alignItems: 'center' }}>
          <Text style={styles.feedbackMessageError}>
            {this.state.errorMessage}
          </Text>
        </View>
      </View>
    );
  }
}

export { LoginPage };

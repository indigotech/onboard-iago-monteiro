import React from 'react';
import {
  View,
} from 'react-native';
import { client } from '../../utils/gql/clients';
import { storeData } from '../../utils/local-storage';
import { Navigation } from 'react-native-navigation';
import { styles} from '../global-styles';
import { LoginResponse} from '../../utils/gql/types';
import { loginMutation } from '../../utils/gql/tags';
import PageTitle from '../../components/atomic/atm.page-title/page-title.component';
import FormInput from '../../components/atomic/mol.form-input/form-input.component';
import InputErrorLabel from '../../components/atomic/atm.form-input-error/form-input-error.component';
import Button from '../../components/atomic/atm.button/button.component';
import {checkEmailFormat, checkPasswordFormat} from '../../utils/input-validation-functions';

interface LoginState {
  email: string,
  password: string,
  emailErrorMessage: string,
  passwordErrorMessage: string,
  hasEmailError: boolean,
  hasPasswordError: boolean,
  isLoading: boolean,
  responseErrorMessage: string
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
 
      hasEmailError: false,
      hasPasswordError: false,
 
      emailErrorMessage:"",
      passwordErrorMessage:"",
 
      isLoading: false,
      responseErrorMessage: ""

    };
  }

  private validateInputs = () => {

    let hasError = false;

    const invalidEmail = checkEmailFormat(this.state.email);

    if(invalidEmail){
      this.setState({
        hasEmailError: true,
        emailErrorMessage: invalidEmail
      });

      hasError = true;

    } else{

      this.setState({
        hasEmailError: false,
        emailErrorMessage: ""
      });
    }

    const invalidPassword = checkPasswordFormat(this.state.password);

    if(invalidPassword){
      
      this.setState({
        hasPasswordError: true,
        passwordErrorMessage: invalidPassword
      });

      hasError = true;

    } else{

      this.setState({
        hasPasswordError: false,
        passwordErrorMessage: ""
      });
    }

    return hasError;
  }

  handleLogin = () => {

    if(this.state.isLoading){
      return;
    }

    this.setState({ 
      responseErrorMessage: ""
    });

    const invalidInputs = this.validateInputs();
    
    if(invalidInputs){
      return;
    }

    this.setState({ 
      isLoading: true
    });
    
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

      this.setState({  
        responseErrorMessage: "" 
      });

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
      this.setState({ responseErrorMessage: errorMessage });
    
    }).finally(() => {
      this.setState({ isLoading: false });
    });
  }

  handleEmailChange = (value:string) => this.setState({ email: value });
  handlePasswordChange = (value:string) => this.setState({ password: value });

  render() {

    return (
      <View style={styles.container}>
      
        <PageTitle>Bem-vindo à Taqtile!</PageTitle>

        <FormInput 
          onChange={this.handleEmailChange} 
          label="e-mail" 
          errorMessage={this.state.emailErrorMessage} 
          hasError={this.state.hasEmailError}
        />

        <FormInput 
          onChange={this.handlePasswordChange} 
          label="senha" 
          errorMessage={this.state.passwordErrorMessage} 
          hasError={this.state.hasPasswordError}
          isPassword={true}
        />

        <Button text='Entrar' handleFunction={this.handleLogin} isLoading={this.state.isLoading}/>
        
        <View style={{width:'80%'}}>
          <InputErrorLabel>{this.state.responseErrorMessage}</InputErrorLabel>
        </View>
        
      </View>
    );
  }
}

export { LoginPage };

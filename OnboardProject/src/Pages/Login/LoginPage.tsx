import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { client, loginMutation } from '../../Utils/graphQlComm';
import { storeData } from '../../Utils/LocalStorage';
import { Navigation } from 'react-native-navigation';
import { styles } from './Loginstyles';
import {UserType} from '../Users/UsersPage';
import {checkEmailFormat, checkPasswordFormat} from '././LoginInputValidation';

interface LoginResponse{
  login: {
    token:string,
    user: UserType
  }
}

interface LoginState {
  email: string,
  password: string,
  errorMessage: string,
  hasErrorMessage: boolean,
  isLoading: boolean
}
interface LoginProps {
  componentId: string
}
class LoginPage extends React.Component<LoginProps, LoginState>{

  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      hasErrorMessage: false,
      isLoading: false
    }
  }

  handleLogin = () => {

    if(this.state.isLoading){
      return;
    }

    this.setState({ isLoading: true });

    const emailInvalido = checkEmailFormat(this.state.email);
    const passwordInvalida = checkPasswordFormat(this.state.password);

    if(emailInvalido || passwordInvalida){
      this.setState({hasErrorMessage: true, errorMessage: (emailInvalido || passwordInvalida || "")});

      return;
    }
   
    //Parâmetros da mutation
    const login = loginMutation;
    const email = this.state.email;
    const password = this.state.password;

    //Envia request
    client.mutate<LoginResponse>({ 
      mutation: login, 
      variables: {data: {email ,password}}
    }).then((result) => {

      const token = result.data?.login.token;
      storeData("AUTH_TOKEN", token);

      this.setState({ hasErrorMessage: false, errorMessage: "" })

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
      })

    }).catch((error) => {
      
      const errorMessage = error.graphQLErrors?.[0]?.message || "Houve um erro. Tente novamente.";
      console.log(error.graphQLErrors?.[0]?.message);
    
      this.setState({ hasErrorMessage: true, errorMessage: errorMessage });
    
    }).finally(() => {
      this.setState({ isLoading: false });
    });

    

  }

  render() {

    //Decide a cor e o texto do botão de submissão do formulário, a depender do estado da requisição.
    let buttonTextStyles: [{}] = [styles.buttonText];
    let buttonText = "Entrar";
    if (this.state.isLoading) {
      buttonTextStyles.push(styles.buttonTextLoading);
      buttonText = "Aguarde...";
    }
    else {
      buttonTextStyles.push(styles.buttonTextNotLoading);
    }

    return (
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Bem-vindo à Taqtile!</Text>
        <View>
          <Text style={styles.inputName}>E-mail</Text>
        </View>
        <TextInput style={styles.textInput} onChangeText={(value) => this.setState({ email: value })} />
        <View>
          <Text style={styles.inputName}>Senha</Text>
        </View>
        <TextInput style={styles.textInput} onChangeText={(value) => this.setState({ password: value })}
          secureTextEntry={true} />
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={buttonTextStyles}>
            {buttonText}
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

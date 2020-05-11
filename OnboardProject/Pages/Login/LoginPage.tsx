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


interface LoginState {
  email: string,
  password: string,
  errorMessage: string,
  hasEmailError: boolean,
  hasPasswordError: boolean,
  hasLoginError: boolean,
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
      hasEmailError: false,
      hasPasswordError: false,
      hasLoginError: false,
      isLoading: false
    }
  }

  handleLogin = () => {

    const emailOk: Boolean = this.checkEmailFormat();
    const passwordOk: Boolean = this.checkPasswordFormat();

    if (emailOk && passwordOk) {

      this.setState({ isLoading: true });

      //Obtém objeto gqltag a partir do que foi preenchido no formulário
      const login = loginMutation(this.state.email, this.state.password);

      //Envia request
      client.mutate({ mutation: login }).then((result) => {

        storeData("AUTH_TOKEN", result.data.login.token);

        this.setState({ isLoading: false });
        this.setState({ hasEmailError: false, hasLoginError: false, hasPasswordError: false, errorMessage: "" })

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
        this.setState({ isLoading: false });
        console.log(error.graphQLError[0])
        // let errorMessage = error.toString().split(':')[2].trim();

        // this.setState({ hasLoginError: true, errorMessage: errorMessage });
      });

    }

  }

  checkPasswordFormat = () => {

    if (this.state.password.length < 7) {
      this.setState({ errorMessage: "Senha curta demais" });
      this.setState({ hasPasswordError: true });
      return false;
    }

    const re = new RegExp('^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$')
    if (re.test(this.state.password)) {
      this.setState({ hasPasswordError: false });
      return true;
    }
    this.setState({ errorMessage: "Formato de senha inválido. Deveria ter pelo menos um número e uma letra" });
    this.setState({ hasPasswordError: true });
    return false;
  }

  checkEmailFormat = (): Boolean => {

    const re = new RegExp('^[a-z0-9.]+@[a-z0-9]+\.(com)')
    if (re.test(this.state.email)) {
      this.setState({ hasEmailError: false })
      return true;
    }
    this.setState({ errorMessage: "Formato de e-mail inválido" });
    this.setState({ hasEmailError: true });
    return false;

  }

  render() {

    //Decide a cor e o texto do botão de submissão do formulário, a depender do estado da requisição.
    let buttonTextStyles: [{}] = [styles.buttonText];
    let buttonText = "Entrar";
    if (this.state.isLoading) {
      buttonTextStyles.push({ backgroundColor: 'grey' });
      buttonText = "Aguarde...";
    }
    else {
      buttonTextStyles.push({ backgroundColor: '#4d089a' });
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
          <Text style={(this.state.hasEmailError || this.state.hasLoginError || this.state.hasPasswordError)
            ? styles.feedbackMessageError : styles.feedbackMessageGood}>
            {this.state.errorMessage}
          </Text>
        </View>
      </View>
    );
  }
}

export { LoginPage };

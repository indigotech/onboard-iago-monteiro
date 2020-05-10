import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import { InMemoryCache, HttpLink, ApolloClient } from 'apollo-boost';
import gql from 'graphql-tag'
import {storeData, retrieveData} from './utils';

declare const global: {HermesInternal: null | {}};

interface AppState{
  email: string,
  password: string,
  errorMessage: string,
  hasEmailError: boolean,
  hasPasswordError: boolean,
  hasLoginError: boolean
}

class App extends React.Component<{},AppState>{

  constructor(props: {}){
    super(props);
    this.state = {
      email : '',
      password : '',
      errorMessage : '',
      hasEmailError : false,
      hasPasswordError : false,
      hasLoginError : false
    }
  }
 
  handleLogin = () => {
    const emailOk : Boolean = this.checkEmailFormat();
    const passwordOk : Boolean = this.checkPasswordFormat();

    

    if(emailOk && passwordOk){

      const loginMutation = gql`mutation Login{
        login(data: {email: "${this.state.email}" password: "${this.state.password}"}){
          token
          user{
            id
            name
          }
        }
      }`;
     
      const cache = new InMemoryCache();
      const link = new HttpLink({
        uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
      });

      const client = new ApolloClient({
        cache: cache,
        link: link
      });
      
      client.mutate({mutation: loginMutation}).then((result) => {
        
        storeData("AUTH_TOKEN",result.data.login.token);
        this.setState({hasLoginError: false, errorMessage: "Login successful."});
          
      }).catch((result) => {
      
        let errorMessage = result.toString().split(':')[2].trim();

        this.setState({hasLoginError: true, errorMessage: errorMessage});
      });

    }
   
  }

  checkPasswordFormat = () => {

    if(this.state.password.length < 7){
      this.setState({errorMessage: "Password too short"});
      this.setState({hasPasswordError: true});
      return false;
    }

    const re = new RegExp('^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$')
    if(re.test(this.state.password)){
      this.setState({hasPasswordError: false});
      return true;
    }
    this.setState({errorMessage:"Invalid password format. Should have at least one digit and one letter."});
    this.setState({hasPasswordError: true});
    return false;
  }

  checkEmailFormat = () : Boolean =>{

    const re = new RegExp('^[a-z0-9.]+@[a-z0-9]+\.(com)')
    if(re.test(this.state.email)){
      this.setState({hasEmailError: false})
      return true;
    }
    this.setState({errorMessage:"Invalid E-mail format."});
    this.setState({hasEmailError: true});
    return false;

  }

  render() {
    const styles = StyleSheet.create({
  
      container: {
        flex:1,
        height: '60%',
        alignItems:'center',
        backgroundColor: '#EEEEEE',
        justifyContent:'center'
      },
      button: {
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: 'purple',
        width:'80%',
        marginTop: 30,
        paddingVertical: 10
      },
      pageTitle: {
        alignItems: 'center',
        fontSize: 26,
        fontWeight: 'bold'
      },
      inputName: {
        fontSize: 16,
        marginTop: 20
      },
      feedbackMessage: {
        fontSize: 16,
        marginTop: 20,
        color: (this.state.hasPasswordError || this.state.hasEmailError || this.state.hasLoginError) ? 'red' : 'green'
      },
      textInput: {
        borderRadius: 15,
        borderColor: 'grey',
        borderBottomWidth: 3,
        borderTopWidth: 3,
        borderRightWidth: 10,
        borderLeftWidth: 10,
        paddingLeft: 15,
        backgroundColor: '#FFFFFF',
        width: '90%',
        marginTop: 5
      }
    });

    
    return(
        <View style={styles.container}> 
          <Text style={styles.pageTitle}>Bem-vindo à Taqtile!</Text> 
        <View>
          <Text style={styles.inputName}>E-mail</Text>
        </View>
        <TextInput style={styles.textInput} onChangeText={(value) => this.setState({email : value})}/>    
        <View>
          <Text style={styles.inputName}>Senha</Text>
        </View>
        <TextInput style={styles.textInput} onChangeText={(value) => this.setState({password : value})}/>
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={{fontWeight: 'bold', color:'white'}}>
              Entrar
            </Text>
        </TouchableOpacity>
    
        <View style={{width:'80%', alignItems:'center'}}>
          <Text style={styles.feedbackMessage}>
        
            {this.state.errorMessage}
          </Text>
        </View>
           
        
      </View>   
    );
  }
}

export {App};

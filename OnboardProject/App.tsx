
import React from 'react';
import {useState} from 'react';

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

declare const global: {HermesInternal: null | {}};

const App : React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasPasswordError, setHasPasswordError] = useState(false);

  function handleLogin(){
    const emailOk : Boolean = checkEmailFormat();
    const passwordOk : Boolean = checkPasswordFormat();

    if(emailOk && passwordOk){
      console.log("Both fields good");
    }
    else{
      console.log("Problem in fields.");
    }
  }

  function checkPasswordFormat(){

    if(password.length < 7){
      setErrorMessage("Password too short");
      setHasPasswordError(true);
      return false;
    }

    const re = new RegExp('^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$')
    if(re.test(password)){
      setHasPasswordError(false);
      return true;
    }
    setErrorMessage("Invalid password format. Should have at least one digit and one letter.");
    setHasPasswordError(true);
    return false;
  }

  function checkEmailFormat() : Boolean{

    const re = new RegExp('^[a-z0-9.]+@[a-z0-9]+\.(com)')
    if(re.test(email)){
      setHasEmailError(false);
      return true;
    }
    setErrorMessage("Invalid E-mail format.");
    setHasEmailError(true);
    return false;

  }

  return (
        <View style={styles.container}> 
          <Text style={styles.pageTitle}>Bem-vindo à Taqtile!</Text> 
        <View>
          <Text style={styles.inputName}>E-mail</Text>
        </View>
        <TextInput style={styles.textInput} onChangeText={(value) => setEmail(value)}/>    
        <View>
          <Text style={styles.inputName}>Senha</Text>
        </View>
        <TextInput style={styles.textInput} onChangeText={(value) => setPassword(value)}/>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={{fontWeight: 'bold', color:'white'}}>
              Entrar
            </Text>
        </TouchableOpacity>

        <View style={{width:'80%', alignItems:'center'}}>
          <Text style={styles.inputName}>{(hasPasswordError || hasEmailError) ? errorMessage : ""}</Text>
        </View>
           
        
      </View>   
  );
};

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


export default App;

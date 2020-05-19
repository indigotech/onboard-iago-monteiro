import { 
  View, 
  ScrollView, 
  Alert, 
  Platform, 
  KeyboardAvoidingView 
} from 'react-native';
import React from 'react';
import { styles } from '../global-styles';
import DatePicker from '../../components/atomic/atm.date-picker/atm.date-picker.component';
import { createUser } from '../../utils/gql/create-user';
import { UserInputType } from '../../utils/gql/types';
import * as types from '../../utils/input-types';
import { Navigation } from 'react-native-navigation';
import FormInput from '../../components/atomic/mol.form-input/form-input.component';
import ButtonEnviar from '../../components/atomic/atm.button/button.component';
import CentralizedError from '../../components/atomic/atm.form-input-error/form-input-centralized-error.component';


interface AddUsersPageProps {
  componentId: string
}

interface AddUsersPageState {
  user: UserInputType,
  isLoading: boolean,

  responseErrorMessage: string,

  hasNameError: boolean,
  hasPasswordError: boolean,
  hasEmailError: boolean,
  hasPhoneError: boolean,
  hasRoleError: boolean,
  hasBirthDateError: boolean,
}

class AddUsersPage extends React.Component<AddUsersPageProps, AddUsersPageState>{

  constructor(props: AddUsersPageProps) {

    super(props);
    this.state = {
      user: { name: '', phone: '', email: '', role: '', birthDate: '', password: '' },
      isLoading: false,
      
      responseErrorMessage: "",
      
      hasNameError: false,
      hasPasswordError: false,
      hasEmailError: false,
      hasPhoneError: false,
      hasRoleError: false,
      hasBirthDateError: false,
    }
  }

  private handleAddUser = () => {
    
    if(this.state.isLoading){
      return;
    }

    this.setState({ 
      responseErrorMessage: ""
    });

    const hasAnError = (this.state.hasBirthDateError || this.state.hasEmailError || this.state.hasNameError
      || this.state.hasPhoneError || this.state.hasPasswordError || this.state.hasBirthDateError);
    
    if(hasAnError){
      return;
    }

    this.setState({ 
      isLoading: true
    });

    createUser(this.state.user).then((result) => {

      if(result.data){

        Alert.alert("Sucesso", `Usuário criado com id ${result.data?.createUser?.id}`);

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

      }
      else{

        if(result.errors?.[0]?.message)
          this.setState({
            responseErrorMessage: result.errors?.[0]?.message
          });
      }

    }).catch((erro) => {
      
      this.setState({
        responseErrorMessage: erro.graphQLErrors?.[0]?.message || 
          erro.errors?.[0]?.message|| "Houve um erro"
      });

    }).finally(() => {

      this.setState({
        isLoading: false
      });

    });
  }

  private handleDateChange = (value: string, hasBirthDateError: boolean) => {
    
    this.setState((prevState) => {
      let user = {
      ...prevState.user,
      birthDate: value
      }
      return {
        hasBirthDateError,
        user
      }
    });

  }

  private handleNameChange = (value: string, hasNameError: boolean) => {

    this.setState((prevState) => {
      let user = {
        ...prevState.user,
        name: value
      }
      return { 
        hasNameError,
        user 
      };
    });
  }

  private handleEmailChange = (value: string, hasEmailError: boolean) => {

    this.setState((prevState) => {
      let user = {
        ...prevState.user,
        email: value
      }
      return {
        hasEmailError,
        user 
      };
    });
  }

  private handlePasswordChange = (value: string, hasPasswordError: boolean) => {

    this.setState((prevState) => {
      let user = {
        ...prevState.user,
        password: value
      }
      return {
        hasPasswordError, 
        user 
      };
    });
  }

  private handlePhoneChange = (value: string, hasPhoneError: boolean) => {

    this.setState((prevState) => {
      let user = {
        ...prevState.user,
        phone: value
      }

      return {
        hasPhoneError,
        user,
      };
    });
  }

  private handleRoleChange = (value: string, hasRoleError: boolean) => {

    this.setState((prevState) => {
      let user = {
        ...prevState.user,
        role: value
      }
      return {
        hasRoleError,
        user 
      };
    });
  }

  render() {
    
    return (
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={[styles.container]}
      >
        <ScrollView style={{width:'100%'}}>
          <View style={styles.container}>
            
            <FormInput 
              handler={this.handleNameChange}
              label={types.name.label}
              validator={types.name.validator}
            />

            <FormInput 
            handler={this.handleEmailChange}
            label={types.email.label}
            validator={types.email.validator}
            />

            <FormInput 
              handler={this.handlePasswordChange}
              label={types.password.label}
              validator={types.password.validator}
              
              isPassword={true}
            />

            <FormInput 
              handler={this.handlePhoneChange}
              label={types.phone.label}
              validator={types.phone.validator}
            />
            
            <DatePicker handler={this.handleDateChange}/>

            <FormInput 
            handler={this.handleRoleChange}
            label={types.role.label}
            validator={types.role.validator}
            />

            <ButtonEnviar text='Entrar' handleFunction={this.handleAddUser} isLoading={this.state.isLoading}/>
            
            <CentralizedError>{this.state.responseErrorMessage}</CentralizedError>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export { AddUsersPage };

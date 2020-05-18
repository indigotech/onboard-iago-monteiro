import { 
  View, 
  ScrollView, 
  Alert, 
  Button,
  Platform, 
  KeyboardAvoidingView 
} from 'react-native';
import React from 'react';
import { styles } from '../global-styles';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { createUser } from '../../utils/gql/create-user';
import { UserInputType } from '../../utils/gql/types';
import {
  checkEmailFormat,
  checkPasswordFormat,
  checkRole,
  checkPhoneFormat,
  checkBirthDate,
  checkName
} from '../../utils/input-validation-functions';
import { Navigation } from 'react-native-navigation';
import FormInput from '../../components/atomic/mol.form-input/form-input.component';
import ButtonEnviar from '../../components/atomic/atm.button/button.component';
import InputErrorLabel from '../../components/atomic/atm.form-input-error/form-input-error.component';

interface AddUsersPageProps {
  componentId: string
}

interface AddUsersPageState {
  user: UserInputType,
  showDatePicker: boolean,
  date: Date,
  isLoading: boolean,

  nameErrorMessage: string,
  passwordErrorMessage: string,
  emailErrorMessage: string,
  phoneErrorMessage: string,
  roleErrorMessage: string,
  birthDateErrorMessage: string,

  responseErrorMessage: string,

  hasNameError: boolean,
  hasPasswordError: boolean,
  hasEmailError: boolean,
  hasPhoneError: boolean,
  hasRoleError: boolean,
  hasBirthDateError: boolean,

  birthDateButtonTitle: string
}

class AddUsersPage extends React.Component<AddUsersPageProps, AddUsersPageState>{

  constructor(props: AddUsersPageProps) {

    super(props);
    this.state = {
      user: { name: '', phone: '', email: '', role: '', birthDate: '', password: '' },
      showDatePicker: false,
      date: new Date(),
      isLoading: false,
      
      nameErrorMessage: "",
      passwordErrorMessage: "",
      emailErrorMessage: "",
      phoneErrorMessage: "",
      roleErrorMessage: "",
      birthDateErrorMessage: "",

      responseErrorMessage: "",
      
      hasNameError: false,
      hasPasswordError: false,
      hasEmailError: false,
      hasPhoneError: false,
      hasRoleError: false,
      hasBirthDateError: false,

      birthDateButtonTitle: "Data de nascimento"
    }
  }

  private handleAddUser = () => {
    
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
        responseErrorMessage: erro.graphQLErrors?.[0]?.message || "Houve um erro"
      });

    }).finally(() => {

      this.setState({
        isLoading: false
      });

    });
  }

  private validateInputs = () => {

    let hasError = false;

    const invalidEmail = checkEmailFormat(this.state.user.email);
    const invalidPassword = checkPasswordFormat(this.state.user.password);
    const invalidRole = checkRole(this.state.user.role);
    const invalidPhone = checkPhoneFormat(this.state.user.phone);
    const invalidBirthDate = checkBirthDate(this.state.date);
    const invalidName = checkName(this.state.user.name);
    
    if(invalidName){
      this.setState({
        hasNameError: true,
        nameErrorMessage: invalidName
      });

      hasError = true;

    } else{

      this.setState({
        hasNameError: false,
        nameErrorMessage: ""
      });
    }

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

    if(invalidRole){
      
      this.setState({
        hasRoleError: true,
        roleErrorMessage: invalidRole
      });

      hasError = true;

    } else{

      this.setState({
        hasRoleError: false,
        roleErrorMessage: ""
      });
    }

    if(invalidPhone){
      
      this.setState({
        hasPhoneError: true,
        phoneErrorMessage: invalidPhone
      });

      hasError = true;

    } else{

      this.setState({
        hasPhoneError: false,
        phoneErrorMessage: ""
      });
    }

    if(invalidBirthDate){
      
      this.setState({
        hasBirthDateError: true,
        birthDateErrorMessage: invalidBirthDate
      });

      hasError = true;

    } else{

      this.setState({
        hasBirthDateError: false,
        birthDateErrorMessage: ""
      });
    }

    return hasError;
  }

  private showDatePicker = () => {

    this.setState({ showDatePicker: true });
  }

  private handleDateChange = (event: Event, selectedDate?: Date) => {

    const currentDate = selectedDate || this.state.date;
    const formattedDateRequest = this.currentDateFormatted(currentDate);
    const formattedDateButton = this.currentDateFormatted(currentDate, true);

    this.setState((prevState) => {
      let user = {
        ...prevState.user,
        birthDate: formattedDateRequest
      }
      return {
        date: currentDate,
        birthDateButtonTitle: formattedDateButton,
        showDatePicker: (Platform.OS === 'ios'),
        user: user
      }
    });
  }

  private currentDateFormatted = (date:Date, button:boolean = false) => {

    const day  = date.getDate().toString().padStart(2, '0');
    const month  = (date.getMonth()+1).toString().padStart(2, '0');
    const year = date.getFullYear();

    if(button){
      return day+"/"+month+"/"+year;
    }

    return year+"-"+month+"-"+day;
  }

  private handleNameChange = (value: string) => {

    this.setState((prevState) => {
      let user = {
        ...prevState.user,
        name: value
      }
      return { user };
    });
  }

  private handleEmailChange = (value: string) => {

    this.setState((prevState) => {
      let user = {
        ...prevState.user,
        email: value
      }
      return { user };
    });
  }

  private handlePasswordChange = (value: string) => {

    this.setState((prevState) => {
      let user = {
        ...prevState.user,
        password: value
      }
      return { user };
    });
  }

  private handlePhoneChange = (value: string) => {

    this.setState((prevState) => {
      let user = {
        ...prevState.user,
        phone: value
      }

      return {
        user: user,
      };
    });
  }

  private handleRoleChange = (value: string) => {

    this.setState((prevState) => {
      let user = {
        ...prevState.user,
        role: value
      }
      return { user };
    });
  }


  render() {
    
    return (
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={[styles.container]}
      >
        <ScrollView 
          style={{width:'100%'}}
          >
          <View style={styles.container}>

            <FormInput 
              onChange={this.handleEmailChange} 
              label="e-mail" 
              errorMessage={this.state.emailErrorMessage} 
              hasError={this.state.hasEmailError}
            />

            <FormInput 
              onChange={this.handleNameChange} 
              label="nome" 
              errorMessage={this.state.nameErrorMessage} 
              hasError={this.state.hasNameError}
            />

            <FormInput 
              onChange={this.handlePhoneChange} 
              label="telefone" 
              errorMessage={this.state.phoneErrorMessage} 
              hasError={this.state.hasPhoneError}
            />

            <FormInput 
              onChange={this.handlePasswordChange} 
              label="senha" 
              errorMessage={this.state.passwordErrorMessage} 
              hasError={this.state.hasPasswordError}
              isPassword={true}
            />

            <View  style={{width:'80%'}}> 

              <View style={{ marginTop: styles.inputName.marginTop }}>
                <Button onPress={this.showDatePicker} title={this.state.birthDateButtonTitle} />
              </View>

              {this.state.showDatePicker && (
                <RNDateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  value={this.state.date}
                  maximumDate={new Date()}
                  minimumDate={new Date(1910, 1)}
                  display="default"
                  mode='date'
                  onChange={this.handleDateChange}
                />
              )}

            </View>

            <View style={{width:'80%'}}>
              <InputErrorLabel>{this.state.birthDateErrorMessage}</InputErrorLabel>
            </View>

            <FormInput 
              onChange={this.handleRoleChange} 
              label="role" 
              errorMessage={this.state.roleErrorMessage} 
              hasError={this.state.hasRoleError}
            />

            <ButtonEnviar text='Entrar' handleFunction={this.handleAddUser} isLoading={this.state.isLoading}/>
            
            <View style={{width:'80%'}}>
              <InputErrorLabel>{this.state.responseErrorMessage}</InputErrorLabel>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export { AddUsersPage };

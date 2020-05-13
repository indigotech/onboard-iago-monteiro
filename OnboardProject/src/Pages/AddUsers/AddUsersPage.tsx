import { View, Text, TextInput, TouchableOpacity, Button, ScrollView, Alert } from 'react-native';
import React from 'react';
import { styles, getFormButtonTextAndColor } from '../GlobalStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createUser } from '../../Utils/GQL/createUser';
import { UserInputType } from '../../Utils/GQL/types';
import {
  checkEmailFormat,
  checkPasswordFormat,
  checkRole,
  checkPhoneFormat,
  checkBirthDate,
  checkName
} from '../../Utils/InputValidation';
import { Navigation } from 'react-native-navigation';

interface AddUsersPageProps {
  componentId: string
}

interface AddUsersPageState {
  user: UserInputType,
  showDatePicker: boolean,
  date: Date,
  isLoading: boolean,
  errorMessage: string,
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
      errorMessage: "",
      birthDateButtonTitle: "Data de nascimento"
    }
  }

  private handleAddUser = () => {

    if (this.state.isLoading) {
      return;
    }

    const error = this.getHasError();

    if(error){

      this.setState({
        errorMessage: error
      });

      return;
    }

    this.setState({
      errorMessage: "",
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
            errorMessage: result.errors?.[0]?.message
          });
      }

    }).catch((erro) => {

      this.setState({
        errorMessage: erro.graphQLErrors?.[0]?.message || "Houve um erro"
      });

    }).finally(() => {

      this.setState({
        isLoading: false
      });

    });
  }

  private getHasError = () => {

    const invalidEmail = checkEmailFormat(this.state.user.email);
    const invalidPassword = checkPasswordFormat(this.state.user.password);
    const invalidRole = checkRole(this.state.user.role);
    const invalidPhone = checkPhoneFormat(this.state.user.phone);
    const invalidBirthDate = checkBirthDate(this.state.date);
    const invalidName = checkName(this.state.user.name);

    return (invalidName || invalidEmail || invalidPassword || invalidPhone
        || invalidBirthDate || invalidRole || "");
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
        showDatePicker: false,
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

  private handleRolechange = (value: string) => {

    this.setState((prevState) => {
      let user = {
        ...prevState.user,
        role: value
      }
      return { user };
    });
  }


  render() {

    const { text, color } = getFormButtonTextAndColor(this.state.isLoading);
    let buttonTextStyles = [color, styles.buttonText];

    return (
      <ScrollView style={{backgroundColor:styles.container.backgroundColor}}
        keyboardShouldPersistTaps={'handled'}>
        <View style={styles.container}>

          <View style={styles.inputNameView}>
            <Text style={styles.inputName}>Nome</Text>
          </View>
          <TextInput style={styles.textInput} onChangeText={this.handleNameChange} />

          <View style={styles.inputNameView}>
            <Text style={styles.inputName}>E-mail</Text>
          </View>
          <TextInput style={styles.textInput} onChangeText={this.handleEmailChange}
          />

          <View style={styles.inputNameView}>
            <Text style={styles.inputName}>Senha</Text>
          </View>
          <TextInput style={styles.textInput} onChangeText={this.handlePasswordChange}
            secureTextEntry={true}
          />

          <View style={styles.inputNameView}>
            <Text style={styles.inputName}>Telefone</Text>
          </View>
          <TextInput style={styles.textInput} onChangeText={this.handlePhoneChange}
            value={this.state.user.phone} />


          <View>

            <View style={{ marginTop: styles.inputName.marginTop }}>
              <Button onPress={this.showDatePicker} title={this.state.birthDateButtonTitle} />
            </View>
            {this.state.showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={this.state.date}
                maximumDate={new Date()}
                minimumDate={new Date(1910, 1)}
                display="default"
                onChange={this.handleDateChange}
              />
            )}

          </View>

          <View style={styles.inputNameView}>
            <Text style={styles.inputName}>Role</Text>
          </View>
          <TextInput style={styles.textInput} onChangeText={this.handleRolechange}
          />

          <TouchableOpacity style={styles.button} onPress={this.handleAddUser}>
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
      </ScrollView>

    );
  }
}

export { AddUsersPage };

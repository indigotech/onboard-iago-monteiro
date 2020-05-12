import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import React from 'react';
import { styles, getFormButtonTextAndColor } from '../GlobalStyles/GlobalStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { retrieveData } from '../../Utils/LocalStorage';
import { clientWithAuth } from '../../Utils/GQL/clients';
//import { usersQuery } from '../../Utils/GQL/clients';
import { UserType } from '../../Utils/GQL/types';
//import { styles } from './UsersStyles';

interface AddUsersPageProps { }
interface AddUsersPageState { 
    user: UserType,
    show: boolean,
    date: Date,
    isLoading:boolean,
    errorMessage: string
}

class AddUsersPage extends React.Component<AddUsersPageProps, AddUsersPageState>{

    constructor(props: AddUsersPageProps) {
        super(props);
        this.state = {
            user:{id:'',name:'',phone:'',email:'',role:'',birthDate:'',__typename:''},
            show:false,
            date: new Date(),
            isLoading:false,
            errorMessage:""
        }
    }

    handleAddUser = () => {

    }
    showDatePicker = () => {
        this.setState({show:true});
    }

    onDateChange = (event: Event, selectedDate?:Date|undefined) => {
        const currentDate = selectedDate || this.state.date;
        this.setState({date:currentDate});
        this.setState({show:false});
    };

    onNameChange = (value:string) => 
        this.setState((prevState) => {
            let user = {
                ...prevState.user,
                name: value
            }
            return {user};
        });
    onEmailChange = (value:string) => 
        this.setState((prevState) => {
            let user = {
                ...prevState.user,
                email: value
            }
            return {user};
        });
    onPasswordChange = (value:string) => 
        this.setState((prevState) => {
            let user = {
                ...prevState.user,
                email: value
            }
            return {user};
        });
    onPhoneChange = (value:string) => 
        this.setState((prevState) => {
            let user = {
                ...prevState.user,
                phone: value
            }
            return {user};
        });
    onRolechange = (value:string) => 
        this.setState((prevState) => {
            let user = {
                ...prevState.user,
                role: value
            }
            return {user};
        });
    

    render() {
        const {text, color} = getFormButtonTextAndColor(this.state.isLoading);
        let buttonTextStyles = [color,styles.buttonText];

        return (
            <View style={styles.container}>
               
                <View>
                    <Text style={styles.inputName}>Nome</Text>
                </View>
                <TextInput style={styles.textInput} onChangeText={this.onNameChange}/>
                
                <View>
                    <Text style={styles.inputName}>E-mail</Text>
                </View>
                <TextInput style={styles.textInput} onChangeText={this.onEmailChange} 
                />

                <View>
                    <Text style={styles.inputName}>Senha</Text>
                </View>
                <TextInput style={styles.textInput} onChangeText={this.onPasswordChange}
                    secureTextEntry={true} 
                />

                <View>
                    <Text style={styles.inputName}>Telefone</Text>
                </View>
                <TextInput style={styles.textInput} onChangeText={this.onPhoneChange}/>

               
                <View>

                    <View style={{marginTop: styles.inputName.marginTop}}> 
                        <Button onPress={this.showDatePicker} title="Data de Nascimento" />
                    </View>
                    {this.state.show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={this.state.date}
                        maximumDate={new Date()}
                        display="default"
                        onChange={this.onDateChange}
                        />
                    )}

                </View>
                
                <View>
                    <Text style={styles.inputName}>Role</Text>
                </View>
               <TextInput style={styles.textInput} onChangeText={this.onRolechange} 
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
        );
    }
}

export { AddUsersPage };
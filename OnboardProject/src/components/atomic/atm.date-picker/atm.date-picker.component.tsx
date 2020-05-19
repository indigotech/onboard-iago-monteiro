import React, { useState } from 'react';
import {View, Button, Platform} from 'react-native';
import CentralizedError from '../atm.form-input-error/form-input-centralized-error.component';
import {LabelTextStyled} from '../atm.form-input-label/form-input-label.component.style';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../../../pages/global-styles';
import {birthDate} from '../../../utils/input-types';

interface DatePickerProps {

    handler: (value: string, hasError: boolean) => void
}

function DatePicker (props: DatePickerProps) {

    const [showDatePicker,setShowDatePicker] = useState(false);
    const [buttonTitle, setButtonTitle] = useState(birthDate.label);
    const [errorMessage, setErrorMessage] = useState("");
    const [date, setDate] = useState(new Date());

    function handlePressDatePicker () {
        
        setShowDatePicker(true);
    
    }

    function currentDateFormatted (date:Date, button:boolean = false) {

        const day  = date.getDate().toString().padStart(2, '0');
        const month  = (date.getMonth()+1).toString().padStart(2, '0');
        const year = date.getFullYear();

        if(button){

            return day+"/"+month+"/"+year;
        }

        return year+"-"+month+"-"+day;
    }

    function handleDateChange (event: Event, selectedDate?: Date) {

        setShowDatePicker(Platform.OS === 'ios');

        if(selectedDate){
            
            const formattedDateRequest = currentDateFormatted(selectedDate);

            setButtonTitle(currentDateFormatted(selectedDate, true));
            setDate(selectedDate);

            const dateError = birthDate.validator(selectedDate);

            if(dateError){

                props.handler(formattedDateRequest, true);
                setErrorMessage(dateError);
            } else{

                props.handler(formattedDateRequest, false);
                setErrorMessage("");
            }
        }
    }
    
    return(

        <React.Fragment>

            <View  style={{width:'80%'}}> 

                <View style={{ marginTop: styles.inputName.marginTop }}>
                    <Button onPress={handlePressDatePicker} title={buttonTitle} />
                </View>

                {showDatePicker && (
                <RNDateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={date}
                    maximumDate={new Date()}
                    minimumDate={new Date(1910, 1)}
                    display="default"
                    mode='date'
                    onChange={handleDateChange}
                />
                )}
            </View>

            <CentralizedError>{errorMessage}</CentralizedError>
        </React.Fragment>
    );
}

export default DatePicker;
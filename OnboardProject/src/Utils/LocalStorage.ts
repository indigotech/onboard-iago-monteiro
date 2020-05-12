import { AsyncStorage } from "react-native";

export async function storeData (fieldName:string, value:string | undefined) {
  if(value){
    try {
      await AsyncStorage.setItem(fieldName, value);
  } catch (error) {
     console.error(error);
    }
  }      
}
  
export async function retrieveData (fieldName:string){
  try {
      const value = await AsyncStorage.getItem(fieldName);
      if (value !== null) {

        return value;
      }
  } catch (error) {
      console.error(error);
  }
}
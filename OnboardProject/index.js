import {LoginPage} from './src/Pages/Login/LoginPage';
import {UsersPage} from './src/Pages/Users/UsersPage';
import { Navigation } from "react-native-navigation";

if (__DEV__) {
    require('react-devtools');
}

Navigation.registerComponent('Login Page', () => LoginPage);
Navigation.registerComponent('Users', () => UsersPage);

LoginPage.options = {
    topBar: {
      title: {
        text: 'Login',
        color: 'white'
      },
      background: {
        color: '#4d089a'
      }
    }
  }

Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: "Login Page"
              }
            }
          ]
        }
      }
    });
  });


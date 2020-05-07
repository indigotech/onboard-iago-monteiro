import {LoginPage} from './Pages/Login/LoginPage';
import {UsersPage} from './Pages/Users/UsersPage';

import {name as appName} from './app.json';

import { Navigation } from "react-native-navigation";

Navigation.registerComponent('Login Page', () => LoginPage);
Navigation.registerComponent('Blank', () => UsersPage);

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


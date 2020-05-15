import {LoginPage} from './src/Pages/Login/LoginPage';
import {UsersPage} from './src/Pages/Users/UsersPage';
import {AddUsersPage} from './src/Pages/AddUsers/AddUsersPage';
import {UserDetailsPage} from './src/Pages/Users/UserDetailsPage';
import { Navigation } from "react-native-navigation";

if (__DEV__) {
    require('react-devtools');
}

Navigation.registerComponent('Login Page', () => LoginPage);
Navigation.registerComponent('Users', () => UsersPage);
Navigation.registerComponent('AddUsers', () => AddUsersPage);
Navigation.registerComponent('UserDetails', () => UserDetailsPage);

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: '#4d089a'
  },
  topBar: {
    title: {
      text:"Login",
      color: 'white'
    },
    backButton: {
      color: 'white'
    },
    background: {
      color: '#4d089a'
    }
  }
});

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


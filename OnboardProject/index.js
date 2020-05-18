import {LoginPage} from './src/pages/login/LoginPage';
import {UsersPage} from './src/pages/users/UsersPage';
import {AddUsersPage} from './src/pages/add-users/AddUsersPage';
import {UserDetailsPage} from './src/pages/users/UserDetailsPage';
import { Navigation } from "react-native-navigation";

if (__DEV__) {
    require('react-devtools');
}

Navigation.events().registerAppLaunchedListener(async () => {
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

Navigation.registerComponent('Login Page', () => LoginPage);
Navigation.registerComponent('Users', () => UsersPage);
Navigation.registerComponent('AddUsers', () => AddUsersPage);
Navigation.registerComponent('UserDetails', () => UserDetailsPage);




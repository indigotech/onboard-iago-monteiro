#Onboard

#Learning to use git and React Native
Typescript will start being used soon in this project.

#Environment and Tools:
Windows 10
node 14.1.0
Android Studio 3.6.3
not using Expo

#Steps to run and debug
In order to run an android app, start a Virtual Device on Android Studio and run the following commands on the project folder:

npx react-native start 
npx react-native run-android

This should load the app on the device currently being emulated.
In order to see code changes, just save the updated file and the new app should be built.
If saving alone doesn't do the trick, type "r" into the terminal in which you ran the "start" command above.

#TODO:
1. Check for invalid credentials error whenever making a request that requires authorization.
If invalid credentials returns, redirect user to LoginPage. 
2. After login, change root to some other page. Right now, that would be UsersPage.
Go to react-native-navigation page on Advanced Navigation.
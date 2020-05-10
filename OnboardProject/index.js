/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {App} from './App';
import {name as appName} from './app.json';

// import { ApolloProvider } from 'react-apollo';
// import ApolloClient from 'apollo-client';

// const client = new ApolloClient({
//   uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
// });



// const Applic = () => (
//   <ApolloProvider client={client}>
//       <App/>
//   </ApolloProvider>
// );

// AppRegistry.registerComponent(appName, () => Applic);

// import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from '@apollo/react-hooks';

// const Client = () => {
//     const client = new ApolloClient({
//         uri: 'https://48p1r2roz4.sse.codesandbox.io',
//       });

//   return (
//     <ApolloProvider client={client}>
//       <App />
//     </ApolloProvider>)
// }

AppRegistry.registerComponent(appName, () => App);
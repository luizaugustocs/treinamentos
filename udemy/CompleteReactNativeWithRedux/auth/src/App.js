import React from 'react';
import firebase from 'firebase';
import { View, Text } from 'react-native';
import { Header } from './components/common';

class App extends React.Component {
    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyCYvT7Gi8o2J1xicw9fnfvo9EuT7YUbpJI',
            authDomain: 'auth-rn-course.firebaseapp.com',
            databaseURL: 'https://auth-rn-course.firebaseio.com',
            projectId: 'auth-rn-course',
            storageBucket: 'auth-rn-course.appspot.com',
            messagingSenderId: '895735181917'
        });
    }


    render() {
        return (
            <View>
                <Header text='Authentication' />
                <Text>
                    An App
                </Text>
            </View>

        );
    }
}

export default App;

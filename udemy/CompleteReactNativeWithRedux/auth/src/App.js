import React from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import { Header } from './components/common';
import LoginForm from './components/LoginForm';

class App extends React.Component {
    state = {
        loggedIn: false
    };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyCYvT7Gi8o2J1xicw9fnfvo9EuT7YUbpJI',
            authDomain: 'auth-rn-course.firebaseapp.com',
            databaseURL: 'https://auth-rn-course.firebaseio.com',
            projectId: 'auth-rn-course',
            storageBucket: 'auth-rn-course.appspot.com',
            messagingSenderId: '895735181917'
        });

        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ loggedIn: !!user });
        });
    }


    render() {
        return (
            <View>
                <Header text='Authentication' />
                <LoginForm />
            </View>

        );
    }
}

export default App;

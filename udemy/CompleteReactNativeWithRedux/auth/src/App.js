import React from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import { Button, Header, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends React.Component {
    state = {
        loggedIn: null
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

    onLogout = () => {
        firebase.auth().signOut();
    }

    renderContent = () => {
        switch (this.state.loggedIn) {
        case true:
            return (<Button onClick={this.onLogout}>
                Log out
            </Button>);
        case false:
            return <LoginForm />;
        default:
            return <Spinner size="large" />;
        }
    }


    render() {
        return (
            <View>
                <Header text='Authentication' />
                {this.renderContent()}
            </View>

        );
    }
}

export default App;

import React from 'react';
import firebase from 'firebase';
import { Card, CardSection, Button, Input } from './common';

class LoginForm extends React.Component {
    state = {
        email: '',
        password: ''
    };

    onLogin = () => {
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password);
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="user@email.com"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Password"
                        placeholder="password"
                        secure
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />
                </CardSection>
                <CardSection>
                    <Button onPress={this.onLogin}>
                        Log In
                    </Button>
                </CardSection>
            </Card>

        );
    }
}

export default LoginForm;

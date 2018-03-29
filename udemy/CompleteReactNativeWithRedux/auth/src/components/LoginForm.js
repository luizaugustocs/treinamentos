import React from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import { Card, CardSection, Button, Input, Spinner } from './common';

class LoginForm extends React.Component {
    state = {
        email: '',
        password: '',
        error: '',
        loading: false
    };

    onLogin = () => {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess)
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .catch(() => {
                        this.setState({ error: 'Authentication Failed' });
                    });
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    };

    onLoginSuccess = () => {
        this.setState({
            email: '',
            password: ''
        });
    };

    renderButton = () => {

        return this.state.loading
            ? <Spinner size="small" />
            : (
                   <Button onClick={this.onLogin}>
                       Log In
                   </Button>
               );
    };

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
                <Text style={styles.errorTextStyle}>{this.state.error}</Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>

        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;

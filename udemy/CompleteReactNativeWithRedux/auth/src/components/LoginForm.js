import React from 'react';
import { TextInput } from 'react-native';
import { Card, CardSection, Button } from './common';


class LoginForm extends React.Component {
    state = { text: '' };

    render() {
        return (
            <Card>
                <CardSection>
                    <TextInput
                        onChangeText={text => this.setState({ text })}
                        value={this.state.text}
                        style={{ height: 20, width: 100 }}
                    />
                </CardSection>
                <CardSection />
                <CardSection>
                    <Button>
                        Log In
                    </Button>
                </CardSection>
            </Card>

        );
    }
}

export default LoginForm;

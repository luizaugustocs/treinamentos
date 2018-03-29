import React from 'react';
import { Card, CardSection, Button, Input } from './common';


class LoginForm extends React.Component {
    state = { email: '' };

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

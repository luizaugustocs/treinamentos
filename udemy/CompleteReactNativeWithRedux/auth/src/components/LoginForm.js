import React from 'react';
import { Card, CardSection, Button, Input } from './common';


class LoginForm extends React.Component {
    state = { text: '' };

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label=""
                        onChangeText={text => this.setState({ text })}
                        value={this.state.text}
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

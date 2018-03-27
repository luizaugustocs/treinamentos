import React from 'react';
import { TextInput } from 'react-native';
import { Card, CardSection, Button } from './common';


class LoginForm extends React.Component {
    render() {
        return (
            <Card>
                <CardSection>
                    <TextInput style={{ height: 20, width: 100 }} />
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

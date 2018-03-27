import React from 'react';
import { Card, CardSection, Button } from './common';

class LoginForm extends React.Component {

    render() {
        return (
            <Card>
                <CardSection />
                <CardSection />
                <CardSection>
                    <Button >
                        Log In
                    </Button>
                </CardSection>
            </Card>

        );
    }
}

export default LoginForm;
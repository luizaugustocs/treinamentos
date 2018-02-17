import React from 'react';
import { Text, TouchableOpacity } from 'react-native';


const Button = () => {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>ABV</Text>
        </TouchableOpacity>
    );
};

const styles = {
    button: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#007aff',
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 3
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }
};

export default Button;

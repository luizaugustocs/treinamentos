import React from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

class AlbumList extends React.Component {

    componentWillMount() {
        axios.get('https://rallycoding.herokuapp.com/api/music_albums')
            .then(data => {
                console.log(data)
            });
    }

    render() {
        return (
            <View>
                <Text>AlbumList</Text>
            </View>
        );
    }
}


export default AlbumList;

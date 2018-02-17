import React from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

class AlbumList extends React.Component {

    state = {
        albums: []
    };

    componentWillMount() {
        axios.get('https://rallycoding.herokuapp.com/api/music_albums')
            .then(response => {
                this.setState({ albums: response.data });
            });
    }

    renderAlbums = (albums) => albums.map(album => <Text key={album.title}>{album.title}</Text>);


    render() {
        return (
            <View>
                {this.renderAlbums(this.state.albums)}
            </View>
        );
    }
}


export default AlbumList;

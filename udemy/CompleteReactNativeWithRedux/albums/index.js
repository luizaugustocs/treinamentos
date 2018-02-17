import React from 'react';
import { AppRegistry, View } from 'react-native';
// import App from './App';
import Header from './src/components/Header';
import AlbumList from './src/components/AlbumList';

const App = () => (
    <View style={{ flex: 1 }}>
        <Header text="Albums" />
        <AlbumList />
    </View>
);
AppRegistry.registerComponent('albums', () => App);

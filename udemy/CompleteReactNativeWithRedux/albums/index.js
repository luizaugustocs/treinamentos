import React from 'react';
import { AppRegistry } from 'react-native';
// import App from './App';
import Header from './src/components/Header';

const App = () => (
  <Header text="Albums" />
);
AppRegistry.registerComponent('albums', () => App);

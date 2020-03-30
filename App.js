import React from 'react';
import {StatusBar, View, StyleSheet} from 'react-native';
import Main from './src/js/main';

const App = () => {
  return (
      <Main/>
    );
};

const styles = StyleSheet.create({
  container: {
    flex : 1
  }
})

export default App;
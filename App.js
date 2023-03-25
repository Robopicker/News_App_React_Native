import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import AppNavigation from './src/navigation/navigationPage';
import {store} from './src/store';

function Main() {
  return (
    <SafeAreaView style={{flex: 1}} edges={['top', 'top', 'left', 'right']}>
      <View style={{flex: 1}}>
        <AppNavigation />
      </View>
    </SafeAreaView>
  );
}
function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Main />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;

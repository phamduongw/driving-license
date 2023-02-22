import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {ExamStackNavigator} from './src/navigation/StackNavigator';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {RefProvider} from './src/contexts/RefContext';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RefProvider>
          <NavigationContainer>
            <ExamStackNavigator />
          </NavigationContainer>
        </RefProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

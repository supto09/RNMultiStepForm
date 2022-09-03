import React from 'react';
import {NativeBaseProvider} from 'native-base';
import Application from './src/modeules';

const App = () => {
  return (
    <NativeBaseProvider>
      <Application />
    </NativeBaseProvider>
  );
};

export default App;

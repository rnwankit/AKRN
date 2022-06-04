import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { configStore, store } from './src/redux/store'
import Product from './src/container/Product/Product'
import Counter from './src/container/Counter/Counter'
import { PersistGate } from 'redux-persist/integration/react'
import SplashScreen from 'react-native-splash-screen'

export default function App() {
  const { store, persistor } = configStore();

  useEffect(() => {
    SplashScreen.hide();
  });
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View>
          <Text>App</Text>
          <Product />
        </View>
      </PersistGate>
    </Provider>
  )
}
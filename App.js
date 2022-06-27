import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import {configStore, store} from './src/redux/store'
import Product from './src/container/Product/Product'
import Counter from './src/container/Counter/Counter'
import { PersistGate } from 'redux-persist/integration/react'
import PromiseExample from './src/container/PromiseExample/PromiseExample'
import Signup from './src/container/Auth/SignUp'

export default function App() {
const {store, persistor} = configStore();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <Signup />
      </PersistGate>
    </Provider>
  )
}
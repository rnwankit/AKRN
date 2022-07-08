//notification: https://www.youtube.com/watch?v=RgN1TEnULVQ&list=PL8kfZyp--gEXs4YsSLtB3KqDtdOFHMjWZ&index=30&ab_channel=ProgrammingwithMash

import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { configStore, store } from './src/redux/store'
import Product from './src/container/Product/Product'
import Counter from './src/container/Counter/Counter'
import { PersistGate } from 'redux-persist/integration/react'
import PromiseExample from './src/container/PromiseExample/PromiseExample'
import Signup from './src/container/Auth/SignUp'
import PushNotification, { Importance } from 'react-native-push-notification';

export default function App() {
  const { store, persistor } = configStore();
  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: "channel-id", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  useEffect(() => {
    createChannels()
  }, [])
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Signup />
      </PersistGate>
    </Provider>
  )
}
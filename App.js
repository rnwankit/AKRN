// // //notification: https://www.youtube.com/watch?v=RgN1TEnULVQ&list=PL8kfZyp--gEXs4YsSLtB3KqDtdOFHMjWZ&index=30&ab_channel=ProgrammingwithMash

// // import { View, Text } from 'react-native'
// // import React, { useEffect } from 'react'
// // import { Provider } from 'react-redux'
// // import { configStore, store } from './src/redux/store'
// // import Product from './src/container/Product/Product'
// // import Counter from './src/container/Counter/Counter'
// // import { PersistGate } from 'redux-persist/integration/react'
// // import PromiseExample from './src/container/PromiseExample/PromiseExample'
// // import Signup from './src/container/Auth/SignUp'
// // import PushNotification, { Importance } from 'react-native-push-notification';

// // export default function App() {
// //   const { store, persistor } = configStore();
// //   const createChannels = () => {
// //     PushNotification.createChannel(
// //       {
// //         channelId: "channel-id", // (required)
// //         channelName: "My channel", // (required)
// //         channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
// //         playSound: false, // (optional) default: true
// //         soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
// //         importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
// //         vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
// //       },
// //       (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
// //     );
// //   }

// //   useEffect(() => {
// //     createChannels()
// //   }, [])
// //   return (
// //     <Provider store={store}>
// //       <PersistGate loading={null} persistor={persistor}>
// //         <Signup />
// //       </PersistGate>
// //     </Provider>
// //   )
// // }

import {
  CardField,
  StripeProvider,
  useStripe,
} from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, Button, SafeAreaView, View } from 'react-native';

const App = () => {
  return (
    <StripeProvider
      publishableKey="pk_test_51LL18HSDZMLAH51NSW5hNpKXUFDKZpRZ9QZvkLYuHQOhZat6QIBdqSAzMLkZad4HBnXNFIY0MOrr5AItkA9d7GpC0020oTO0fi"
      merchantIdentifier="merchant.identifier">
      <SafeAreaView>
        <StripeTest />
      </SafeAreaView>
    </StripeProvider>
  );
};

const StripeTest = () => {
  const { confirmPayment } = useStripe();

  const [key, setKey] = useState('');

  useEffect(() => {
    fetch('http://172.17.2.231:3001/payment-sheet', {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json'
    }
    })
      .then(res => res.json())
      .then(res => {
        console.log('intent', res);
        setKey((res.clientSecret));
      })
      .catch(e => Alert.alert("bbbb", e.message));

    // var responseClone; // 1
    // fetch('http://172.17.2.231:3001/create-payment-intent')
    //   .then(function (response) {
    //     responseClone = response.clone(); // 2
    //     return response.json();
    //   })
    //   .then(function (data) {
    //     // Do something with data
    //   }, function (rejectionReason) { // 3
    //     console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
    //     responseClone.text() // 5
    //       .then(function (bodyText) {
    //         console.log('Received the following instead of valid JSON:', bodyText); // 6
    //       });
    //   });
  }, []);

  const handleConfirmation = async () => {
    if (key) {
      const { paymentIntent, error } = await confirmPayment(key, {
        type: 'Card',
        billingDetails: {
          email: 'John@email.com',
        },
      });

      if (!error) {
        Alert.alert('Received payment', `Billed for ${paymentIntent?.amount}`);
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <View>
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
      <Button title="Confirm payment" onPress={handleConfirmation} />
    </View>
  );
};

export default App;

// import React, { useState, useEffect } from "react";
// import { StyleSheet, Button, View} from 'react-native';
// import {
//   CardField,
//   CardFieldInput,
//   useStripe,
// } from '@stripe/stripe-react-native';

// const App = () => {
//   const [card, setCard] = useState(CardFieldInput.Details | null);
//   const { confirmPayment, handleCardAction } = useStripe()
//   const API_URL = "http://172.17.2.231:3001";
//   const { initPaymentSheet, presentPaymentSheet } = useStripe();
//   const [loading, setLoading] = useState(false);

//   const fetchPaymentSheetParams = async () => {
//     const response = await fetch(`${API_URL}/checkout`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const { paymentIntent, ephemeralKey, customer } = await response.json();
//     return {
//       paymentIntent,
//       ephemeralKey,
//       customer,
//     };
//   };
//   const initializePaymentSheet = async () => {
//     const {
//       paymentIntent,
//       ephemeralKey,
//       customer,
//     } = await fetchPaymentSheetParams();
//     const { error } = await initPaymentSheet({
//       customerId: customer,
//       customerEphemeralKeySecret: ephemeralKey,
//       paymentIntentClientSecret: paymentIntent,
//     });
//     if (!error) {
//       setLoading(true);
//     }
//   };
//   const openPaymentSheet = async () => {
//     const { error } = await presentPaymentSheet({ clientSecret });
//     if (error) {
//       Alert.alert(`Error code: ${error.code}`, error.message);
//     } else {
//       Alert.alert('Success', 'Your order is confirmed!');
//     }
//   };
//   useEffect(() => {
//     initializePaymentSheet();
//   }, []);
//   return (
//     <View style={styles.container}>
//       <CardField
//         postalCodeEnabled={false}
//         placeholder={{
//           number: '4242 4242 4242 4242',
//         }}
//         cardStyle={{
//           backgroundColor: '#FFFFFF',
//           textColor: '#000000',
//         }}
//         style={{
//           width: '100%',
//           height: 50,
//           marginVertical: 30,
//         }}
//         onCardChange={(cardDetails) => {
//           setCard(cardDetails);
//         }}
//         onFocus={(focusedField) => {
//           console.log('focusField', focusedField);
//         }}
//       />
//         <Button
//           style={styles.button}
//           disabled={!loading}
//           title="Checkout"
//           color="#841584"
//           onPress={openPaymentSheet}
//         />
//         </View>
//   )
// }

// export default App;
// const styles = StyleSheet.create({
//   container: {
//      flex: 1,
//      padding: 20,
//      marginHorizontal: 10,
//      marginVertical: 10,
//   },
//   button: {
//      backgroundColor: '#00aeef',
//      borderColor: 'red',
//      borderWidth: 5,
//      borderRadius: 15       
//   }
// })
// // // //notification: https://www.youtube.com/watch?v=RgN1TEnULVQ&list=PL8kfZyp--gEXs4YsSLtB3KqDtdOFHMjWZ&index=30&ab_channel=ProgrammingwithMash

// // // import { View, Text } from 'react-native'
// // // import React, { useEffect } from 'react'
// // // import { Provider } from 'react-redux'
// // // import { configStore, store } from './src/redux/store'
// // // import Product from './src/container/Product/Product'
// // // import Counter from './src/container/Counter/Counter'
// // // import { PersistGate } from 'redux-persist/integration/react'
// // // import PromiseExample from './src/container/PromiseExample/PromiseExample'
// // // import Signup from './src/container/Auth/SignUp'
// // // import PushNotification, { Importance } from 'react-native-push-notification';

// // // export default function App() {
// // //   const { store, persistor } = configStore();
// // //   const createChannels = () => {
// // //     PushNotification.createChannel(
// // //       {
// // //         channelId: "channel-id", // (required)
// // //         channelName: "My channel", // (required)
// // //         channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
// // //         playSound: false, // (optional) default: true
// // //         soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
// // //         importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
// // //         vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
// // //       },
// // //       (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
// // //     );
// // //   }

// // //   useEffect(() => {
// // //     createChannels()
// // //   }, [])
// // //   return (
// // //     <Provider store={store}>
// // //       <PersistGate loading={null} persistor={persistor}>
// // //         <Signup />
// // //       </PersistGate>
// // //     </Provider>
// // //   )
// // // }

// import {
//   CardField,
//   StripeProvider,
//   useStripe,
// } from '@stripe/stripe-react-native';
// import React, { useEffect, useState } from 'react';
// import { Alert, Button, SafeAreaView, View } from 'react-native';
// import { initStripe } from '@stripe/stripe-react-native';

// const App = () => {
//   const { confirmPayment } = useStripe();

//   const [key, setKey] = useState('');

//   useEffect(() => {
//     fetch('http://172.17.2.231:3001/create-payment-intent', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(res => res.json())
//       .then(res => {
//         console.log('intent', res);
//         setKey((res.clientSecret));
//       })
//       .catch(e => Alert.alert("bbbb", e.message));
//   }, []);

//   useEffect(() => {
//     async function initialize() {
//       await initStripe({
//         publishableKey: key,
//       });
//     }
//     initialize().catch(console.error);
//   }, []);

//   const handleConfirmation = async () => {
//     if (key) {
//       const a = await confirmPayment(key, {
//         paymentMethodType: 'Card',
//         billingDetails: {
//           email: 'rnwprogrammingankit@gmail.com',
//         },
//       });

//       console.log(a);

//       // if (!error) {
//       //   Alert.alert('Received payment', `Billed for ${paymentIntent?.amount}`);
//       // } else {
//       //   console.log(paymentIntent);;
//       // }
//     }
//   };


//   return (
//     <StripeProvider
//       publishableKey="pk_test_51LL18HSDZMLAH51NSW5hNpKXUFDKZpRZ9QZvkLYuHQOhZat6QIBdqSAzMLkZad4HBnXNFIY0MOrr5AItkA9d7GpC0020oTO0fi"
//       merchantIdentifier="merchant.identifier">
//       <SafeAreaView>
//         <View>
//           <CardField
//             postalCodeEnabled={false}
//             placeholder={{
//               number: '4242 4242 4242 4242',
//             }}
//             cardStyle={{
//               backgroundColor: '#FFFFFF',
//               textColor: '#000000',
//             }}
//             style={{
//               width: '100%',
//               height: 50,
//               marginVertical: 30,
//             }}
//             onCardChange={cardDetails => {
//               console.log('cardDetails', cardDetails);
//             }}
//             onFocus={focusedField => {
//               console.log('focusField', focusedField);
//             }}
//           />
//           <Button title="Confirm payment" onPress={handleConfirmation} />
//         </View>
//       </SafeAreaView>
//     </StripeProvider>
//   );
// };

// export default App;

import {
  CardField,
  StripeProvider,
  useStripe,
} from '@stripe/stripe-react-native';
import React, {useEffect, useState} from 'react';
import {Alert, Button, SafeAreaView, View} from 'react-native';
import { initStripe } from '@stripe/stripe-react-native';
import FoodHome from './src/container/Food/FoodHome';

const App = () => {
  return (
    
      <SafeAreaView>
        <FoodHome />
        {/* <StripeTest /> */}
      </SafeAreaView>
  );
};

const StripeTest = () => {
  const {confirmPayment} = useStripe();

  const [key, setKey] = useState('');

  useEffect(() => {
    fetch('http://172.17.2.231:3001/create-payment-intent', {
      method: 'POST',
    })
      .then(res => res.json())
      .then(res => {
        console.log('intent', res);
        setKey((res.clientSecret));
      })
      .catch(e => Alert.alert(e.message));
  }, []);

  

  const handleConfirmation = async () => {
    if (key) {
      const {paymentIntent, error} = await confirmPayment(key, {
        type: 'Card',
        paymentMethodType: 'Card',
        billingDetails: {
          email: 'John@email.com',
        },
      });

      if (!error) {
        Alert.alert('Received payment', `Billed for ${paymentIntent?.amount}`);
      } else {
        console.log(error);
        Alert.alert('Error', error.message);
      }
    }
  };

  // useEffect(() => {
  //   async function initialize() {
  //     await initStripe({
  //       publishableKey: "pk_test_51LL18HSDZMLAH51NSW5hNpKXUFDKZpRZ9QZvkLYuHQOhZat6QIBdqSAzMLkZad4HBnXNFIY0MOrr5AItkA9d7GpC0020oTO0fi",
  //     });
  //   }
  //   initialize().catch(console.error);
  // }, []);

  return (
    <View>
      {/* <StripeProvider
      publishableKey="pk_test_51LL18HSDZMLAH51NSW5hNpKXUFDKZpRZ9QZvkLYuHQOhZat6QIBdqSAzMLkZad4HBnXNFIY0MOrr5AItkA9d7GpC0020oTO0fi"
      merchantIdentifier="merchant.identifier">
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
      </StripeProvider> */}
      
    </View>
  );
};

export default App;
import React, {
  Component, useEffect,
} from 'react';
import { useState } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { useDispatch } from 'react-redux';
import { createNewUserEmail } from '../../redux/action/auth.action';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import PushNotification, { Importance } from 'react-native-push-notification';


const MyStatusBar = ({ backgroundColor, ...props }) => (

  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSignup = () => {
    let data = {
      email,
      password
    }
    dispatch(createNewUserEmail(data))
    // console.log("ok", email, password);
  }

  GoogleSignin.configure({
    webClientId: '603324519381-lo8hk4vgeoc3j60jdof17ub4bl6k5jui.apps.googleusercontent.com',
  });

  const handleGoogleSignIn = async () => {
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const googleUser = auth().signInWithCredential(googleCredential);

    googleUser.then((a) => console.log(a))
  }

  handleNotification = () => {
    PushNotification.localNotification({
      channelId: "channel-id",
      id: '123',
      title: 'title',
      message: 'hi'
    });
  }

  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
      <View style={styles.appBar} />
      <View style={styles.content}>
        <TextInput
          onChangeText={setEmail}
          value={email}
          style={styles.input}
          placeholder='Please enter email'
        />
        <TextInput
          onChangeText={setPassword}
          value={password}
          style={styles.input}
          placeholder='Please enter password'
        />
        <TouchableOpacity
          onPress={handleSignup}
          style={styles.button}
        >
          <Text>Signup</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleGoogleSignIn}
          style={styles.button}
        >
          <Text>Signin with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNotification}
          style={styles.button}
        >
          <Text>Notification</Text>
        </TouchableOpacity>

        <View>
          <Text>Already have an account? </Text>
          <TouchableOpacity>
            <Text>
              Signin
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#79B45D',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    //backgroundColor: '#33373B',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#79B45D",
    padding: 10,
    margin: 12,
  },
});
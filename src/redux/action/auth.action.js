import * as ActionTypes from '../ActionTypes';
import auth from '@react-native-firebase/auth';
import { AsyncStorage } from 'react-native';

export const loadingAuth = () => (dispatch) => {
    try {
        dispatch({ type: ActionTypes.AUTH_LOADING });
    } catch (e) {
        dispatch({ type: ActionTypes.AUTH_ERROR });
    }
}

export const createNewUserEmail = (data) => {
    return async (dispatch) => {
        loadingAuth();
        auth()
            .createUserWithEmailAndPassword(data.email, data.password)
            .then(() => {
                auth().onAuthStateChanged(function(user) {
                    user.sendEmailVerification()
                })
            })
            .then(() => {
                auth().onAuthStateChanged(function(user) {
                    if (user.emailVerified) {
                        dispatch({type: ActionTypes.SIGNUP_SUCCESS, payload: user});
                    } else {
                        dispatch({type: ActionTypes.AUTH_ERROR, payload: "Please verify email id."});
                    }
                })
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    dispatch({type: ActionTypes.AUTH_ERROR, payload: "That email address is already in use!"});
                } else if (error.code === 'auth/invalid-email') {
                    dispatch({type: ActionTypes.AUTH_ERROR, payload: "That email address is invalid!"});
                } else {
                    dispatch({type: ActionTypes.AUTH_ERROR, payload: error.code});
                }
            });
    }
}

export const signInEmail = (data) => {
    return async (dispatch) => {
        loadingAuth();
        auth()
            .signInWithEmailAndPassword(data.email, data.password)
            .then((user) => {
                AsyncStorage.setItem("user", user);
                dispatch({type: ActionTypes.SIGNIN_SUCCESS, payload: user})
            })
            .catch((error) => {
                dispatch({type: ActionTypes.AUTH_ERROR, payload: error.code});
            })
    }
}

export const signOut = () => {
    return async (dispatch) => {
        loadingAuth();
        auth()
            .signOut()
            .then(() => {
                dispatch({type: ActionTypes.SIGNOUT_SUCCESS})
                AsyncStorage.clear()
            })
            .catch((error) => {
                dispatch({type: ActionTypes.AUTH_ERROR, payload: error.code});
            })
    }
}

export const resetEmailPassword = () => {
    return async (dispatch) => {
        loadingAuth();
        auth()
            .sendPasswordResetEmail()
            .then(() => {
                dispatch({type: ActionTypes.RESET_SUCCESS, payload: 'Password reset link sent to your email id.'})
            })
            .catch((error) => {
                dispatch({type: ActionTypes.AUTH_ERROR, payload: error.code});
            })
    }
} 
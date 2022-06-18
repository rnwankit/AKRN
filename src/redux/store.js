import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducer";
import thunk from 'redux-thunk'

import { persistStore, persistReducer } from 'redux-persist'
import { counterReducer } from "./reducer/counter.reducer";

import createSagaMiddleware from 'redux-saga'
import rootSaga from "./sagas/rootSaga";
import { AsyncStorage } from "react-native";

const saga = createSagaMiddleware() 

const middleWares = [saga, thunk]

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['counter']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const configStore = () => {
    let store = createStore(persistedReducer, applyMiddleware(...middleWares))
    let persistor = persistStore(store)

    saga.run(rootSaga)

    return { store, persistor }
}
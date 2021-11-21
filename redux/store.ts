import { productsApi } from './../services/products';
import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./counterSlice"
import productsReducer from "./productsSlice"
import cartReducer from "./cartSlice"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { combineReducers } from "redux"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"
import { setupListeners } from '@reduxjs/toolkit/query'
import { pokemonApi } from '../services/pokemon'

import productsSlice from "./productsSlice"

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const persistConfig = {
	key: "root",
	version: 2,
	storage: AsyncStorage,
	blacklist: ['products'],

}

const rootReducer = combineReducers({
  	[pokemonApi.reducerPath]: pokemonApi.reducer,
  	[productsApi.reducerPath]: productsApi.reducer,	
	counter: counterReducer,
	products: productsReducer,
	cart: cartReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,	
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(pokemonApi.middleware, productsApi.middleware)
})

setupListeners(store.dispatch)

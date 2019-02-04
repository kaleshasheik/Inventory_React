import { Store, createStore, compose, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { state, State } from '../reducers'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, state)

export const store: Store<State> = createStore(
  persistedReducer,
  compose(
    applyMiddleware(reduxThunk),
))

export const persistor = persistStore(store)

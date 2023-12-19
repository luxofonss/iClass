/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import authReducer from './slices/authSlice'
import counterReducer from './slices/counterSlice'

import type { PayloadAction } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'
import { authApi } from './service/auth.service'
import { courseApi } from './service/course.service'
import { uploadApi } from './service/upload.service'

const allReducers = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  [uploadApi.reducerPath]: uploadApi.reducer
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer = (state: any, action: PayloadAction) => {
  if (action.type === 'auth/logout') {
    state = undefined
  }
  return allReducers(state, action)
}

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const initialState = {}

// const loggerMiddleware = createLogger({
//   predicate: (getState, action) => !blacklist.includes(action.type)
// })

export function configureAppStore(preloadedState: any) {
  const store = configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        },
        immutableCheck: { warnAfter: 128 }
      }).concat([
        // loggerMiddleware,
        authApi.middleware,
        courseApi.middleware,
        uploadApi.middleware
      ]),
    reducer: persistedReducer,
    preloadedState,
    enhancers: []
  })

  // if (process.env.NODE_ENV !== 'production' && module.hot) {
  //   module.hot.accept('../reducer', () => store.replaceReducer(rootReducer))
  // }

  return store
}

const store = configureAppStore(initialState)
setupListeners(store.dispatch)

export const persistor = persistStore(store)
export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

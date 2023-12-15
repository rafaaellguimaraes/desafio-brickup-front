import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from '../store/reducers'
import rootSaga from '../store/sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware as any));

sagaMiddleware.run(rootSaga)

export default function App({ Component, pageProps }: AppProps) {
  return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	) 
}

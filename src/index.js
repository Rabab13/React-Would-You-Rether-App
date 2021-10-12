import React from 'react'
import ReactDOM from 'react-dom'
// install (sudo npm add react-redux redux)
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './index.css'
import App from './components/App'
import reducers from './reducers'
import middleware from './middleware'

// Create the Store 
const store = createStore(reducers, middleware)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
, document.getElementById('root'))
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
//import isLoggedIn from './reducers/isLoggedIn'
import { createStore } from 'redux'
import allReducers from '../src/reducers/combine-reducers'

const store = createStore(allReducers, 
  +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
  <Router>
   <React.StrictMode>
     <App />
   </React.StrictMode>
  </Router>
  </Provider>
  ,
  document.getElementById('root')
);

reportWebVitals();

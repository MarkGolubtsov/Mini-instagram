import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AuthProvider from "./component/AuthProvider";

ReactDOM.render(<AuthProvider><App/></AuthProvider>, document.getElementById('root'));

serviceWorker.unregister();

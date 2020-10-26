import "./style.css";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
// export { Login } from "./login";
// export { Register } from "./register";
ReactDOM.render(
    <App />, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import { registerRootComponent } from 'expo';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

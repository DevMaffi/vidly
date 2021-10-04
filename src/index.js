import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

import logger from './services/logService';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';

logger.init();

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

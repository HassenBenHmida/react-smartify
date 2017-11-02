import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter>
                    <Route path="/" component={App}></Route>
                </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();

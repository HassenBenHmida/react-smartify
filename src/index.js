import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
=======
>>>>>>> base/zied/fixes
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

<<<<<<< HEAD
import { Provider } from 'react-redux'
import { trackStore } from './stores'

ReactDOM.render(<Provider store={trackStore}>
                    <BrowserRouter>
                        <Route path="/" component={App}></Route>
                    </BrowserRouter>
                </Provider>, document.getElementById('root'));
registerServiceWorker();
=======
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
>>>>>>> base/zied/fixes

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import reducer from "./reducers";
import {createStore} from "redux";
import middleware from "./middleware";
import {BrowserRouter} from "react-router-dom";

const store = createStore(reducer, middleware);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);


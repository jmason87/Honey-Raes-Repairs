import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Repairs } from "./components/Repairs";
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

/*
  you need to import BrowserRouter from react-router-dom and use BrowserRouter below
  in order to use the link and route features.
*/

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Repairs />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

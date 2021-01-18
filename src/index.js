import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App"
import { BrowserRouter } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss'

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));



import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import SignUp from './components/SignUp';
import App from './App'

// const welcom = <h1>Welcom to Kwick messenger</h1>;
ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import WithApolloClient from './components/WithApolloClient';

ReactDOM.render(WithApolloClient(App), document.getElementById('root'));

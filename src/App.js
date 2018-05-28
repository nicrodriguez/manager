import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
    componentWillMount() {
        // Initialize Firebase
        const config = {
            apiKey: 'AIzaSyBhyD54ujwUYzcnB9IXZjUhq26JOBth4SU',
            authDomain: 'manager-e606b.firebaseapp.com',
            databaseURL: 'https://manager-e606b.firebaseio.com',
            projectId: 'manager-e606b',
            storageBucket: '',
            messagingSenderId: '600281228681'
        };
        firebase.initializeApp(config);
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <Router />
            </Provider>
        );
    }

}

export default App;

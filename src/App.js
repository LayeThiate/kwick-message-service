import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ErrorPage from './components/ErrorPage';

class App extends React.Component {

    render() {
        return (
            <BrowserRouter>

                <Switch>
                    <Route exact path='/' component={SignUp}/>
                    <Route exact path='/signup' component={SignUp}/>
                    <Route path='/signin' component={SignIn}/>
                    <Route component={ErrorPage}/>
                </Switch>
            
            </BrowserRouter>
        );
        
    }
}

export default App;
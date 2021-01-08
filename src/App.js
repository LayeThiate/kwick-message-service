import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ErrorPage from './components/ErrorPage';
import UserLogged from './components/UserLogged';
import Message from './components/Messages';
import Routes from './Routes';
import Chat from './components/Chat';

class App extends React.Component {

    render() {
        return (
            <BrowserRouter>

                <Switch>
                    <Route exact path={Routes.default} component={SignUp}/>
                    <Route path={Routes.signup} component={SignUp}/>
                    <Route path={Routes.login} component={SignIn}/>
                    <Route path={Routes.conversations} component={Chat}/>
                    <Route path={Routes.users} component={UserLogged} />
                    <Route path={Routes.message} component={Message} />
                    <Route component={ErrorPage}/>
                </Switch>
            
            </BrowserRouter>
        );
        
    }
}

export default App;
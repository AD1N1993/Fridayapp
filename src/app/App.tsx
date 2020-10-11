import React from 'react';
import './App.scss';
import {Switch, Route, Redirect} from 'react-router-dom';
import {HomePage} from "../features/HomePage/HomePage";
import {LoginPage} from "../features/LoginPage/LoginPage";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path={"/"} render={() => <HomePage/>}/>
                <Route path={'/login'} render={() => <LoginPage/>}/>
                <Route path={"/404"} render={() => <h1>Error 404. Page not found.</h1>}/>
                <Redirect from={"*"} to={"/404"}/>
            </Switch>
        </div>
    );
}

export default App;

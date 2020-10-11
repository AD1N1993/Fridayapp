import React from 'react';
import './App.scss';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Profile} from "../features/Profile/Profile";
import {Login} from "../features/Login/Login";
import {SignUp} from "../features/SignUp/SignUp";
import {Recovery} from "../features/Recovery/Recovery";
import {Initiate} from "../features/Initiate/Initiate";
import {Header} from "../components/Header/Header";

function App() {
    return (
        <div className="App">
            <Header/>
            <Switch>
                <Route exact path={["/Fridayapp", "/"]} render={() => <Profile/>}/>
                <Route path={'/login'} render={() => <Login/>}/>
                <Route path={'/signup'} render={() => <SignUp/>}/>
                <Route path={'/recovery'} render={() => <Recovery/>}/>
                <Route path={'/initiate'} render={() => <Initiate/>}/>
                <Route path={"/404"} render={() => <h1>Error 404. Page not found.</h1>}/>
                <Redirect from={"*"} to={"/404"}/>
            </Switch>
        </div>
    );
}

export default App;

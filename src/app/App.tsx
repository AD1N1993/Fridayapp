import React, {useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from "../features/Login/Login";
import {SignUp} from "../features/SignUp/SignUp";
import {Recovery} from "../features/Recovery/Recovery";
import {Initiate} from "../features/Initiate/Initiate";
import {Header} from "../components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {initializeAppTC} from "./app-reducer";
import {AppRootStateType} from "./store";
import {Preloader} from "../components/Preloader/Preloader";
import s from "./App.module.scss"
import {Packs} from "../features/Packs/Packs";
import {Main} from "../features/Main/Main";
import {Cards} from "../features/Cards/Cards";
import {LearningProcess} from "../features/LearningProcess/LearningProcess";

function App() {
    const dispatch = useDispatch()
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)


    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <Preloader/>
    }

    return (
        <div className={s.App}>
            <Header/>
            <Switch>
                <Route exact path={["/Fridayapp", "/"]} render={() => <Main/>}/>
                <Route path={"/packs"} render={() => <Packs/>}/>
                <Route path={"/main"} render={() => <Main/>}/>
                <Route path={"/learningProcess/:packId"} render={() => <LearningProcess/>}/>
                <Route path={"/login"} render={() => <Login/>}/>
                <Route path={"/signup"} render={() => <SignUp/>}/>
                <Route path={"/recovery"} render={() => <Recovery/>}/>
                <Route path={"/initiate/:token"} render={() => <Initiate/>}/>
                <Route path={"/cards/:packId?"} render={() => <Cards/>}/>
                <Route path={"/404"} render={() => <h1>Error 404. Page not found.</h1>}/>
                <Redirect from={"*"} to={"/404"}/>
            </Switch>
        </div>
    );
}

export default App;

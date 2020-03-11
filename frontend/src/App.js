import React from 'react';
import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Navbar from "./component/navbar/Navbar";
import NewsList from "./component/news/NewsList";
import {Routes} from "./constant/Routes";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar/>
                <Switch>
                    <Route exact path={Routes.news} component={NewsList}/>
                    <Redirect to={Routes.news}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;

import React from 'react';
import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Navbar from "./component/navbar/Navbar";
import NewsList from "./component/news/NewsList";
import {Routes} from "./constant/Routes";
import CreateNews from "./component/news/CreateNews";
import Registration from "./component/registration/Registration";
import {AuthContext} from "./component/AuthProvider";
import Login from "./component/login/Login";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Navbar/>
                    {this.context.currentUser ?
                        <Switch>
                            <Route exact path={Routes.newsCreate} component={CreateNews}/>
                            <Route exact path={Routes.news} component={NewsList}/>
                            <Route exact path={Routes.login} component={Login}/>
                            <Route exact path={Routes.registration} component={Registration}/>
                            <Redirect to={Routes.news}/>
                        </Switch>
                        :
                        <Switch>
                            <Route exact path={Routes.news} component={NewsList}/>
                            <Route exact path={Routes.login} component={Login}/>
                            <Route exact path={Routes.registration} component={Registration}/>
                            <Redirect to={Routes.login}/>
                        </Switch>
                    }
                </BrowserRouter>
            </div>
        );
    }
};
App.contextType = AuthContext;
export default App;

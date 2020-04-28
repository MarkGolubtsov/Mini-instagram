import React from 'react';
import './App.css';
import {BrowserRouter, Redirect, Switch} from 'react-router-dom';
import Navbar from "./component/navbar/Navbar";
import NewsList from "./component/news/NewsList";
import {Routes} from "./constant/Routes";
import CreateNews from "./component/news/CreateNews";
import Registration from "./component/registration/Registration";
import {AuthContext} from "./component/AuthProvider";
import Login from "./component/login/Login";
import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-client';
import {endpoints} from "./constant/endpoints";
import {OnlyGuestRoute} from "./OnlyGuestRoute";
import {PrivateRoute} from "./PrivateRoute";
import {createHttpLink} from "apollo-link-http";
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
    uri: endpoints.graphql,
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('Jwt token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Navbar/>
                    <Switch>
                        <OnlyGuestRoute exact path={Routes.login} component={Login}/>
                        <OnlyGuestRoute exact path={Routes.registration} component={Registration}/>
                        <PrivateRoute exact path={Routes.newsCreate} component={CreateNews}/>
                        <PrivateRoute exact path={Routes.news} component={NewsList}/>
                        <Redirect to={Routes.news}/>
                    </Switch>
                </BrowserRouter>
            </ApolloProvider>
        );
    }
}

App.contextType = AuthContext;
export default App;

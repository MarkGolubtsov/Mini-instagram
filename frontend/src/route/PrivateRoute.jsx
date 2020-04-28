import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import authServices from "../service/authService";
import {Routes} from "../constant/Routes";

export const PrivateRoute = ({component: Component, onlyForAdmin, ...rest}) => (<Route
    {...rest}
    render={props => {
        let user = authServices.getUserFromStorage();
        if (user) {
            return <Component {...props}/>;
        }
        return <Redirect to={Routes.login}/>
    }
    }/>)




import {Redirect, Route} from "react-router-dom";
import authServices from "../service/authService";
import {Routes} from "../constant/Routes";
import React from "react";

export const OnlyGuestRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => {
            let user = authServices.getUserFromStorage();
            if (!user) {
                return <Component {...props}/>;
            } else {
                return <Redirect to={Routes.login}/>
            }
        }
        }/>
);

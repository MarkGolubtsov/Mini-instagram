import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {Routes} from "../../constant/Routes";

import {withRouter} from 'react-router-dom';
import Button from "@material-ui/core/Button";

class Navbar extends React.Component {
    create = () => {
        this.props.history.push(Routes.newsCreate);
    };

    news = () => {
        this.props.history.push(Routes.news);
    };
    login = () => {
        this.props.history.push(Routes.login);
    };

    render() {
        return (
            <AppBar position='static' >
                <Toolbar>
                        <Button onClick={this.news}>
                            News
                        </Button>
                    <Button onClick={this.create}>
                        Create news
                    </Button>
                    <Button onClick={this.login}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>)

    }

}

export default withRouter(Navbar)

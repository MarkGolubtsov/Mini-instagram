import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {Routes} from "../../constant/Routes";

import {Link, withRouter} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import {AuthContext} from "../AuthProvider";
import IconButton from "@material-ui/core/IconButton";
import {ExitToApp} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import {getRouteForCreate} from "../../helper/routeHelper";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AddBoxIcon from '@material-ui/icons/AddBox';
import ExploreIcon from '@material-ui/icons/Explore';

class Navbar extends React.Component {
    create = () => {
        this.props.history.push(getRouteForCreate(Routes.editor));
    };

    posts = () => {
        this.props.history.push(Routes.posts);
    };
    logout = () => this.context.logout();

    render() {
        return (
            <AppBar color='transparent' position='static'>
                <Toolbar>
                    {this.context.currentUser ?
                        <>
                            <IconButton onClick={this.posts}>
                                <ExploreIcon/>
                            </IconButton>
                            <IconButton onClick={this.create}>
                                <AddBoxIcon/>
                            </IconButton>
                            <IconButton>
                                <FavoriteIcon/>
                            </IconButton>
                            <IconButton onClick={this.logout}>
                                <ExitToApp color='secondary'>
                                </ExitToApp>
                            </IconButton>
                        <Typography>
                            Hi,{this.context.currentUser.name}!
                        </Typography>
                        </>
                        :
                        <Link to={Routes.login}>
                            <IconButton>
                                <ExitToApp color='action'/>
                            </IconButton>
                        </Link>

                    }
                </Toolbar>
            </AppBar>)

    }

}

Navbar.contextType = AuthContext;
export default withRouter(Navbar)

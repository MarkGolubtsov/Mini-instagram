import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Routes} from "../../constant/Routes";

import {withRouter} from 'react-router-dom';
import Link from "@material-ui/core/Link";

class Navbar extends React.Component {
    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" >
                        News
                    </Typography>
                </Toolbar>
            </AppBar>)

    }

}

export default withRouter(Navbar)

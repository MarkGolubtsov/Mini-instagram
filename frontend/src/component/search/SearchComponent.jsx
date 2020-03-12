import * as React from "react";
import {withRouter} from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";


class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {title: ''}
    }

    onChange = (event) => {
        this.setState({title: event.target.value});
    };

    render() {
        return (
            <React.Fragment>
                <InputBase
                    onChange={this.onChange}
                    placeholder="Search Google Maps"
                    inputProps={{'aria-label': 'search google maps'}}
                />
                <IconButton type="submit" aria-label="search">
                    <SearchIcon/>
                </IconButton>
            </React.Fragment>
        )
    }
}

export default withRouter(SearchComponent);

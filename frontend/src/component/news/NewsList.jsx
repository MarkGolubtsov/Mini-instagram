import * as React from "react";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import {withRouter} from "react-router-dom";
import {useQuery} from "react-apollo";
import {GET_NEWS} from "../../constant/query";
import News from "./News";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Alert from "../alert/Alert";

const NewsList = () => {
    const {loading, error, data} = useQuery(GET_NEWS);

    let news = (loading || !data) ? [] : data.news.map(news => {
        return <News key={news['id']} news={news}/>
    });

    return (
        <React.Fragment>
            {error ? <Alert severity="error">{error.message}</Alert> : <React.Fragment/>}
            <Container maxWidth="sm">
                <Box display="flex" justifyContent="center">
                    <IconButton>
                        <FavoriteIcon/>
                    </IconButton>
                </Box>
                <Box>
                    {loading || !data ? <LinearProgress/> : news}
                </Box>
            </Container>
        </React.Fragment>)
}
export default withRouter(NewsList)

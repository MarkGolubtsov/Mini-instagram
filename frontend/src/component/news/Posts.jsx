import * as React from "react";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import {withRouter} from "react-router-dom";
import {useQuery} from "react-apollo";
import {GET_NEWS, GET_POSTS} from "../../constant/query";
import News from "./Post";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Alert from "../alert/Alert";
import Post from "./Post";

const Posts = () => {
    const {loading, error, data} = useQuery(GET_POSTS);

    let posts = (loading || !data) ? [] : data.posts.map(post => {
        return <Post key={post['id']} post={post}/>
    });
    return (
        <React.Fragment>
            {error ? <Alert severity="error">{error.message}</Alert> : <React.Fragment/>}
            <Container maxWidth="sm">
                <Box>
                    {loading || !data ? <LinearProgress/> : posts}
                </Box>
            </Container>
        </React.Fragment>)
}
export default withRouter(Posts)

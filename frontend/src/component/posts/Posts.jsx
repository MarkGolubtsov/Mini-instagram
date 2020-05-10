import * as React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import {useQuery} from "react-apollo";
import {GET_POSTS} from "../../constant/query";
import Post from "./Post";
import Alert from "../alert/Alert";
import Typography from "@material-ui/core/Typography";

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
                    {loading || !data
                        ?
                        <LinearProgress/>
                        :
                        posts.length > 1 ? posts : <Typography>No posts</Typography>}
                </Box>
            </Container>
        </React.Fragment>)
}
export default Posts

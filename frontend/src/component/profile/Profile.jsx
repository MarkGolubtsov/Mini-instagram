import {useQuery} from "react-apollo";
import {GET_MY_POSTS} from "../../constant/query";
import Post from "../posts/Post";
import * as React from "react";
import Alert from "../alert/Alert";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

const Profile = () => {

    const {loading, error, data} = useQuery(GET_MY_POSTS);
    let posts = (loading || !data) ? [] : data.myPosts.map(post => {
        return <Post key={post['id']} post={post}/>
    });

    return (
        <React.Fragment>
            {error ? <Alert severity="error">{error.message}</Alert> : <React.Fragment/>}
            <Container maxWidth="sm">
                <Box>
                    {loading || !data
                        ? <LinearProgress/>
                        :
                        posts.length > 1 ? posts : <Typography>No posts</Typography>}
                </Box>
            </Container>
        </React.Fragment>)
}
export default Profile;

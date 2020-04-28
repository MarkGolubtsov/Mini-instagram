import * as React from "react";
import {useContext} from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {withRouter} from "react-router-dom";
import {useMutation} from '@apollo/react-hooks';
import {DELETE_NEWS, DIS_LIKE, LIKE} from "../../constant/mutation";
import {AuthContext} from "../AuthProvider";
import {GET_NEWS} from "../../constant/query";

const News = ({news}) => {

    const updateCache = (client, {data: {deleteNews: item}}) => {
        const data = client.readQuery({
            query: GET_NEWS,
        });
        const newData = {
            news: data.news.filter(t => t.id !== item.id)
        }
        client.writeQuery({
            query: GET_NEWS,
            data: newData
        });
    }

    const [addLike, {loading: addLikeLoading}] = useMutation(LIKE);
    const [removeLike, {loading: removeLikeLoading}] = useMutation(DIS_LIKE);
    const [deleteNews, {loading: deleting, error: deleteError}] = useMutation(DELETE_NEWS);

    const authContext = useContext(AuthContext);

    const remove = () => {
        if (deleting) return;
        deleteNews({
            variables: {id: news.id},
            update: updateCache
        });
    };

    const like = () => {
        if (addLikeLoading) return;
        addLike({variables: {id: news.id}})
    }
    const unLike = () => {
        if (removeLikeLoading) return;
        removeLike({variables: {id: news.id}})
    }

    let isNewsHasLikesFromCurrentUser = news.likes.findIndex(user => user.id === authContext.currentUser.id) > -1;
    return (
        <Box m={1}>
            <Card>
                <CardHeader title={news.title}/>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {news.body}
                    </Typography>
                </CardContent>
                <CardActions>
                    {
                            isNewsHasLikesFromCurrentUser ?
                                <IconButton onClick={unLike} aria-label="Like">
                                    <FavoriteIcon/>
                                </IconButton>
                                :
                                <IconButton onClick={like} aria-label="Like">
                                    <FavoriteBorderIcon/>
                                </IconButton>
                    }
                    <Typography>
                        {news.likes.length}
                    </Typography>
                    <Button onClick={remove} variant='contained' color='secondary'>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </Box>

    )

}
export default withRouter(News);

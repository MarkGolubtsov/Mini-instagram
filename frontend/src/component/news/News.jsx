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
import {LIKE} from "../../constant/mutation";
import {GET_NEWS} from "../../constant/query";
import {AuthContext} from "../AuthProvider";

const News = ({news}) => {
    const [addLike] = useMutation(LIKE,
        {
            update(cache, {data: {addNewsLike}}) {
                const {news} = cache.readQuery({query: GET_NEWS});
                let newsWithUpdateLikes = [...news];
                newsWithUpdateLikes.find(news => news.id === addNewsLike.id).likes = addNewsLike.likes;
                cache.writeQuery({
                    query: GET_NEWS,
                    data: {news: newsWithUpdateLikes},
                });
            }
        }
    );
    const authContext = useContext(AuthContext);


    let isNewsHasLikesFromCurrentUser = news.likes.findIndex(user => user.id === authContext.currentUser.id) > -1;
    console.log(news.likes.findIndex(user => user.id === authContext.currentUser.id))
    console.log(isNewsHasLikesFromCurrentUser)

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
                            <IconButton onClick={() => alert('remove')} aria-label="Like">
                                <FavoriteIcon/>
                            </IconButton>
                            :
                            <IconButton onClick={() => addLike({variables: {id: news.id}})} aria-label="Like">
                                <FavoriteBorderIcon/>
                            </IconButton>
                    }
                    <Typography>
                        {news.likes.length}
                    </Typography>
                    <Button variant='contained' color='secondary'>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </Box>

    )

}
export default withRouter(News);

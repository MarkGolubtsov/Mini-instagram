import * as React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {endpoints} from "../../constant/endpoints";
import {RestRequest} from "../../service/requestService";
import {AuthContext} from "../AuthProvider";
import {withRouter} from "react-router-dom";
import {Routes} from "../../constant/Routes";

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {news: props.news};
    }

    delete = () => {
        RestRequest.delete(endpoints.deleteNews(this.props.news['_id'])).then((response) => {
            this.props.deleteOne(this.props.news);
        }).catch(reason => {
            if (reason.response.status === 401 || reason.response.status === 403) this.props.history.push(Routes.login);
        });
    };

    like = () => {
        if (this.context.currentUser) {
            let news = this.props.news;
            news.likes++;
            RestRequest.put(endpoints.putNews(this.props.news['_id']), {}, news).then(response => {
                let news = this.state.news;
                news.likes = response.data.payload.likes;
                this.setState(news);
            }).catch(reason => {
                if (reason.response.status === 401 || reason.response.status === 403) this.props.history.push(Routes.login);
            });
        }

    };

    render() {
        return (
            <Box m={1}>
                <Card>
                    <CardHeader title={this.props.news.title}/>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {this.props.news.content}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton onClick={this.like} aria-label="Like">
                            <FavoriteIcon/>
                        </IconButton>
                        <Typography>
                            {this.props.news.likes}
                        </Typography>
                        {
                            this.context.currentUser
                                ?
                                <Button onClick={this.delete} variant='contained' color='secondary'>
                                    Delete
                                </Button>
                                :
                                <></>
                        }

                    </CardActions>
                </Card>
            </Box>

        )

    }
}

News.contextType = AuthContext;
export default withRouter(News);

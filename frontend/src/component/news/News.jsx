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
import {endpoints, endpointsClient, endpointsServer} from "../../constant/endpoints";
import {AuthContext} from "../AuthProvider";
import {withRouter} from "react-router-dom";
import {Routes} from "../../constant/Routes";
import {socket} from "../../service/requestService";

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {news: props.news};
    }

    delete = (id) => {
    };

    like = () => {
        if (this.context.currentUser) {
            let news = this.props.news;
            news.likes++;
            socket.on(endpointsClient.updated, (data) => {
                console.log(data);
                if (data.status === 401 || data.status === 403) this.props.history.push(Routes.login);
                news.likes = data.payload.likes;
                this.setState(news);
            });
            socket.emit(endpointsServer.putNews,news);
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
                                <Button onClick={this.delete(this.props.news.id)} variant='contained' color='secondary'>
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

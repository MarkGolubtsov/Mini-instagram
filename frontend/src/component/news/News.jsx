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
import Axios from "axios";
import {endpoints} from "../../constant/endpoints";

export default class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {news:props.news};
    }

    delete = () => {
        Axios.delete(endpoints.deleteNews(this.props.news['_id'])).then((response) => {
            this.props.deleteOne(this.props.news);
        })
    };

    like = () => {
        let news = this.props.news;
        news.likes++;
        Axios.put(endpoints.putNews(this.props.news['_id']),JSON.stringify(news)).then(response => {
            let news = this.state.news;
            news.likes = response.data.likes;
            this.setState(news);
        });
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

                        <Button onClick={this.delete} variant='contained' color='secondary'>
                            Delete
                        </Button>
                    </CardActions>
                </Card>
            </Box>

        )

    }
}

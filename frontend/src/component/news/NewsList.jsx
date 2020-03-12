import * as React from "react";
import News from "./News";
import {endpoints} from "../../constant/endpoints";
import axios from 'axios';
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";


export default class NewsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {news: [], loading: false, order: false};
    }

    deleteOneNews = (element) => {
        let news = this.state.news;
        let updatedNews = news.filter((news) => !(news['_id'] === element['_id']));
        this.setState({news: updatedNews});
    };

    componentDidMount() {
        this.load();
    }

    load = () => {
        this.setState({loading: true});
        axios.get(endpoints.getNewsList + `?sort=likes&order=${this.state.order ? 1 : -1}`)
            .then((response) => {
                const news = response.data;
                this.setState({loading: false, news});
            })
            .catch(function (error) {
                console.log(error);
            })
    };
    topLike = () => {
        this.state.order=!this.state.order;
        this.load();
    };

    render() {
        let loading = this.state.loading;
        let news = this.state.news.map((news) => {
            return <News deleteOne={this.deleteOneNews} key={news['_id']} news={news}/>
        });
        return (
            <React.Fragment>
                <Container maxWidth="sm">
                    <IconButton onClick={this.topLike}>
                        {this.state.order ? <FavoriteBorderIcon/>:<FavoriteIcon/> }
                    </IconButton>
                    <Box>
                        <Container>
                            {loading ?<LinearProgress /> : news}
                        </Container>
                    </Box>
                </Container>
            </React.Fragment>)
    }

}

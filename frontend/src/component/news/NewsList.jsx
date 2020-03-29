import * as React from "react";
import News from "./News";
import Container from "@material-ui/core/Container";
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import {withRouter} from "react-router-dom";
import {socket} from "../../service/requestService";
import {endpointsClient, endpointsServer} from "../../constant/endpoints";


class NewsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {news: [], loading: false, order: true};
    }

    deleteOneNews = (element) => {
        let news = this.state.news;
        let updatedNews = news.filter((news) => !(news['_id'] === element['_id']));
        this.setState({news: updatedNews});
    };

    componentDidMount() {
        this.load(this.state.order);
    }

    load = (order) => {
        this.setState({loading: true});
        let params = {
            sort: 'likes',
            order: order ? 1 : -1
        };
        socket.on(endpointsClient.getAll, (data) => {
            this.setState({order:order,news: data.payload, loading: false});
        });
        socket.emit(endpointsServer.getNewsList, params);
    };
    topLike = () => {
        this.load(!this.state.order);
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
                        {this.state.order ? <FavoriteBorderIcon/> : <FavoriteIcon/>}
                    </IconButton>
                    <Box>
                        <Container>
                            {loading ? <LinearProgress/> : news}
                        </Container>
                    </Box>
                </Container>
            </React.Fragment>)
    }

}

export default withRouter(NewsList)

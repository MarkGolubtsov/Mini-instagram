import * as React from "react";
import News from "./News";
import {endpoints} from "../../constant/endpoints";
import axios from 'axios';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";


export default class NewsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {news: [], loading: false};
    }

    deleteOneNews = (element) => {
        let news = this.state.news;
        let updatedNews = news.filter((news) => !(news['_id'] === element['_id']));
        this.setState({news: updatedNews});
    };

    componentDidMount() {
        this.setState({loading: true});
        axios.get(endpoints.getNewsList)
            .then((response) => {
                const news = response.data;
                this.setState({loading: false, news});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        let news = this.state.news.map((news) => {
            return <News deleteOne={this.deleteOneNews} key={news['_id']} news={news}/>
        });
        if (this.state.loading) {
            news = <CircularProgress/>
        }
        return (
            <React.Fragment>
                <Container maxWidth="sm">
                    {news}
                </Container>
            </React.Fragment>)
    }

}

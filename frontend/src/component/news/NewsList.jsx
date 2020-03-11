import * as React from "react";
import News from "./News";
import {endpoints} from "../../constant/endpoints";
import axios from 'axios';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";


export default class NewsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {news: []};
    }

    deleteOneNews = (element) => {
        let news = this.state.news;
        let updatedNews = news.filter((news) => !(news['_id'] === element['_id']));
        this.setState({news: updatedNews});
    };

    componentDidMount() {
        axios.get(endpoints.getNewsList)
            .then((response) => {
                console.log(response.data);
                const news = response.data;
                this.setState({news});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        let news = this.state.news.map((news) => {
            return <News deleteOne={this.deleteOneNews} key={news['_id']} news={news}/>
        });
        return (
            <React.Fragment>
                <Container maxWidth="sm">
                    {news}
                </Container>
            </React.Fragment>)
    }

}

import * as React from "react";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import {withRouter} from "react-router-dom";
import {Query} from "react-apollo";
import {GET_NEWS} from "../../constant/query";
import News from "./News";
import FavoriteIcon from '@material-ui/icons/Favorite';

const NewsList = () => (
    <Query
        query={GET_NEWS}
    >
        {({loading, error, data}) => {
            let news = loading ? [] : data.news.map(news => {
                return <News key={news['id']} news={news}/>
            });

            return (
                <React.Fragment>
                    <Container maxWidth="sm">
                        <IconButton>
                             {/*<FavoriteBorderIcon/> */}
                             <FavoriteIcon/>
                        </IconButton>
                        <Box>
                            <Container>
                                {loading ? <LinearProgress/> : news}
                            </Container>
                        </Box>
                    </Container>
                </React.Fragment>)
        }}
    </Query>
)
export default withRouter(NewsList)

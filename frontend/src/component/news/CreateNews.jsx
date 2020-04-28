import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {withRouter} from 'react-router-dom';
import {Routes} from "../../constant/Routes";
import {useMutation} from "@apollo/react-hooks";
import {CREATE_NEWS} from "../../constant/mutation";
import {GET_NEWS} from "../../constant/query";

const CreateNews = (props) =>{

    const updateCache = (client, {data: {createNews: item}}) => {
        const data = client.readQuery({
            query: GET_NEWS,
        });
        const newData = {
            news: data.news.concat([item])
        }
        client.writeQuery({
            query: GET_NEWS,
            data: newData
        });
    }

    const [createNews] = useMutation(CREATE_NEWS);

    const onSubmit = event => {
        event.preventDefault();
        const title = event.target.elements[0].value;
        const body = event.target.elements[2].value;
        createNews({variables:{
            title,body
            },update:updateCache}).then((res)=>props.history.push(Routes.news))
    };

        return (
            <Container>
                <form noValidate autoComplete='off' onSubmit={onSubmit}>
                    <Grid
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="center"
                    >
                        <Box m={4}>
                            <Grid item>
                                <TextField  variant="outlined" id='title' label='title'/>
                            </Grid>
                        </Box>
                        <Box m={4}>
                            <Grid>
                                <TextField  label="body" variant="outlined" id="body"  multiline   rowsMax={5}/>
                            </Grid>
                        </Box>

                        <Box m={4} >
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Save
                            </Button>
                        </Box>
                    </Grid>
                </form>
            </Container>

        )
}

export default withRouter(CreateNews);

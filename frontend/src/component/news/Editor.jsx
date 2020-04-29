import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {withRouter} from 'react-router-dom';
import {Routes} from "../../constant/Routes";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {CREATE_NEWS, UPDATE_NEWS} from "../../constant/mutation";
import {GET_NEWS, GET_ONE_NEWS} from "../../constant/query";

const Editor = (props) => {

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

    const [updateNews] = useMutation(UPDATE_NEWS);
    const [createNews] = useMutation(CREATE_NEWS);
    const id = props.match.params.id;
    const {loading, data} = useQuery(GET_ONE_NEWS, {
        variables: {id},
        skip: !id,
    });
    const news = data ? data.oneNews : null;

    const onSubmit = event => {
        event.preventDefault();
        const title = event.target.elements[0].value;
        const body = event.target.elements[3].value;
        !id ?
        createNews({
            variables: {
                title, body
            }, update: updateCache
        }).then((res) => props.history.push(Routes.news))
            :
            updateNews({
                variables:{
                    id,title,body
                }
            }).then((res) => props.history.push(Routes.news))
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
                        <h2>{id ? 'Edit' : 'Create'}</h2>
                    </Box>
                    <Box m={4}>
                        <Grid spacing={2}
                              container
                              direction="row"
                              justify="space-between"
                              alignItems="center">
                            <Grid item>
                                Title:
                            </Grid>
                            <Grid item>
                                <TextField defaultValue={id && !loading ? news.title : ''} variant="outlined" id='title'
                                           placeholder='title' multiline rowsMax={5}/>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box m={4}>
                        <Grid spacing={2}
                              container
                              direction="row"
                              justify="space-between"
                              alignItems="center">
                            <Grid item>
                                Body:
                            </Grid>
                            <Grid item>
                                <TextField defaultValue={id && !loading ? news.body : ''} placeholder="body"
                                           variant="outlined" id="body" multiline rowsMax={5}/>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box m={4}>
                        <Grid justify="space-between" container spacing={5}>
                            <Grid item>
                                <Button style={{marginLeft: '4em'}}
                                        variant="contained"
                                        color="primary" onClick={() => props.history.goBack()}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary">
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </form>
        </Container>

    )
}

export default withRouter(Editor);

import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {endpoints} from "../../constant/endpoints";
import axios from "axios";
import {withRouter} from 'react-router-dom';
import {Routes} from "../../constant/Routes";

class CreateNews extends React.Component {

    onSubmit = event => {
        event.preventDefault();
        console.log(event.target.elements);
         const title = event.target.elements[0].value;
         const content = event.target.elements[1].value;
            axios.post(endpoints.postNews,JSON.stringify({title,content})).then((response) =>{
                this.props.history.push(Routes.news);
            })
    };

    render() {
        return (
            <Container>
                <form noValidate autoComplete='off' onSubmit={this.onSubmit}>
                    <Grid
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="center"
                    >
                        <Box m={4}>
                            <Grid item>
                                <TextField id='title' label='title'/>
                            </Grid>
                        </Box>
                        <Box m={4}>
                            <Grid>
                                <TextareaAutosize id='content' aria-label='empty textarea' placeholder='content'/>
                            </Grid>
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Create
                        </Button>
                    </Grid>
                </form>
            </Container>

        )
    }
}
export default withRouter(CreateNews);

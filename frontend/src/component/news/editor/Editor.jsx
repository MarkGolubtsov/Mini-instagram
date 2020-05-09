import * as React from "react";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.post.title,
            body: props.post.body,
            image: undefined
        }
    }

    onChangeTitle = (e) => {
        this.setState({title: e.target.value});
    }
    onChangeBody = (e) => {
        this.setState({body: e.target.value});
    }
    onChangeImg = (e) => {
        this.setState({image: e.target.files[0]});
    }
    onSave = () => {
        const {title, image, body} = this.state;
        this.props.onSave(title, body, image);
    }

    render() {
        return <Container>
            <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="center"
            >
                <Box m={4}>
                    {this.props.message}
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
                            <TextField onChange={this.onChangeTitle} value={this.state.title} variant="outlined"
                                       id='title'
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
                            <TextField onChange={this.onChangeBody}  value={this.state.body} placeholder="body"
                                       variant="outlined" id="body" multiline rowsMax={5}/>
                        </Grid>
                    </Grid>
                </Box>
                <Box m={4}>
                    {!this.props.post.id &&
                    <React.Fragment>
                        <input
                            name={'document'}
                            hidden
                            accept="image/*"
                            onChange={this.onChangeImg}
                            id="contained-button-file"
                            multiple
                            type="file"
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color={this.state.image ? 'primary' : 'secondary'}
                                    component="span">
                                Upload
                            </Button>
                        </label>
                    </React.Fragment>
                    }

                </Box>
                <Box m={4}>
                    <Grid justify="space-between" container spacing={5}>
                        <Grid item>
                            <Button style={{marginLeft: '4em'}}
                                    variant="contained"
                                    color="primary" onClick={() =>this.props.onCancel()}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                disabled={!this.state.title || !this.state.body || (!this.props.post.id ? !this.state.image : false)}
                                onClick={this.onSave}
                                type="submit"
                                variant="contained"
                                color="primary">
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Container>
    }
}

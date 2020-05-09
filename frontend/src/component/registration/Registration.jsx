import * as React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {Link, withRouter} from 'react-router-dom';
import {Routes} from '../../constant/Routes';
import {AuthContext} from "../AuthProvider";
import Alert from "../alert/Alert";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error: null}
    }

    registration = (event) => {
        event.preventDefault();

        const name = event.target.elements[0].value;
        const email = event.target.elements[2].value;
        const password = event.target.elements[4].value;
        let resultPromise = this.context.registration(name,email,password);
        resultPromise.then(() => {
            this.props.history.push(Routes.news);
        }).catch(reason => {
            this.setState({error: reason.response.data.message})
        });
    };
    render() {
        return (
            <Container component="main" maxWidth="xs">
                {this.state.error ? <Alert severity="error">{this.state.error}</Alert> : <></>}
                <div>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form noValidate onSubmit={this.registration}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to={Routes.login} variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }

}
Registration.contextType = AuthContext;
export default withRouter(Registration)

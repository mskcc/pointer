import React from 'react';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import { bindActionCreators } from 'redux';
import * as loginActions from '@/LoginPage/LoginActions';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { summaryService, authenticationService } from '@/_services';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const mapStateToProps = function (state) {
    return {};
};

const mapDispatchToProps = function (dispatch) {
    return {
        actions: {},
    };
};

const paperHeight = '5vh';

const useStyles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class MetadataPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: authenticationService.currentUserValue,
        };
    }

    componentDidMount() {}

    prepareSampleDist() {}

    render() {
        const { classes, history } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <i className="material-icons">search</i>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Enter a request or sample Id
                    </Typography>
                    <Formik
                        initialValues={{
                            id: '',
                            type: '',
                        }}
                        enableReinitialize={false}
                        validationSchema={Yup.object().shape({
                            id: Yup.string().required('Id is required'),
                            type: Yup.string().required('Type is required'),
                        })}
                        onSubmit={({ id, type }, { setStatus, setErrors, setSubmitting }) => {
                            /*this.login(username, password).then(() => {
                                setSubmitting(false);
                                if (this.props.current_user_error) {
                                    console.log('b');
                                    setErrors({ password: this.props.current_user_error.detail });
                                } else {
                                    history.push('/summary');
                                }
                            });*/
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <form className={classes.form} onSubmit={handleSubmit}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    label="Id"
                                    name="id"
                                    id="id"
                                    onChange={handleChange}
                                    values={values.id}
                                    error={errors.id && touched.id}
                                    helperText={errors.id && touched.id ? errors.id : null}
                                    autoFocus
                                />
                                <FormControl variant="outlined" className={classes.form}>
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                        value={values.type}
                                        id="type"
                                        name="type"
                                        onChange={handleChange}
                                        error={errors.type && touched.type}
                                        label="Type"
                                    >
                                        <MenuItem value={'Sample'}>Sample</MenuItem>
                                        <MenuItem value={'Request'}>Request</MenuItem>
                                    </Select>
                                    <FormHelperText error={errors.type && touched.type}>
                                        {errors.type && touched.type ? errors.type : null}
                                    </FormHelperText>
                                </FormControl>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    disabled={isSubmitting}
                                >
                                    Submit
                                    {isSubmitting && (
                                        <div>
                                            &nbsp;&nbsp;
                                            <CircularProgress />{' '}
                                        </div>
                                    )}
                                </Button>
                            </form>
                        )}
                    </Formik>
                </div>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(MetadataPage));

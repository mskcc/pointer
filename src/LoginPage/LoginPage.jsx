import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { authenticationService } from '@/_services';

import './Login.css';
import {bindActionCreators} from "redux";
import * as loginActions from "@/LoginPage/LoginActions";
import {connect} from "react-redux";


const mapStateToProps = function (state) {
    return {
        current_user: state.loginReducer.current_user,
    }
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(loginActions, dispatch);
};

class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (localStorage.getItem('currentUser')) {
            this.props.history.push('/');
        }

        this.login = this.login.bind(this);
    }

    login(username, password) {
        this.props.login(username, password).then(data => {
            const {from} = this.props.location.state || {from: {pathname: "/"}};
            this.props.history.push('/runs');
        });
    }

    render() {
        return (
            <div>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required('Username is required'),
                        password: Yup.string().required('Password is required')
                    })}
                    onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                        setStatus();
                        this.login(username, password);
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                    <h2>Login</h2>
                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="username">Username</label>
                                            <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
                                            {isSubmitting &&
                                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                            }
                                        </div>
                                        {status &&
                                            <div className={'alert alert-danger'}>{status}</div>
                                        }
                                    </Form>
                                </div>
                            </div>
                        </div>
                    )}
                />
            </div>
        )
    }
}

const ConnectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export default ConnectedLoginPage
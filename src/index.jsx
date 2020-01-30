import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router-dom'; //NotFoundRoute
import { Provider, connect } from 'react-redux';

import '@/App/App.css';

import { authenticationService } from '@/_services';

import { history } from '@/_helpers';
import { PrivateRoute } from '@/_components';
import { LoginPage } from '@/LoginPage/LoginPage';
import { StartRun } from '@/Run/StartRun'
import { RunsPage } from '@/Run/RunsPage'
import { Unauthorized } from '@/Unauthorized';
import ConnectedPipelinePage from './PipelinePage/PipelinePage.jsx';

import mskLogo from "@/public/MSKCC-logo.jpg";
import FilesPage from "@/Files/FilesPage";

import store from '@/App/store.js';


class AppContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser } = this.state;
        var email = "";
        if (currentUser && currentUser.user) {
            email = currentUser.user.email
        }

        return (
            <Provider store={ store }>

                <Router history={history}>

                    <header className="header">
                        <img src={mskLogo} className="logo"/>
                        <div className="title">Voyager</div>
                    </header>

                    <div>
                        {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <ul className="navbar-nav">
                                <li className="pull-left"><Link to="/" className="nav-item nav-link">Files</Link>
                                </li>
                                <li className="pull-left"><Link to="/pipelines"
                                                                className="nav-item nav-link">Pipelines</Link></li>
                                <li className="pull-left"><Link to="/runs" className="nav-item nav-link">Runs</Link>
                                </li>
                                <li className="pull-left"><a onClick={this.logout}
                                                             className="nav-item nav-link">Logout</a></li>
                                <li className="pull-right"><p className="nav-item nav-link pull-right">{email}</p>
                                </li>
                            </ul>
                        </nav>
                        }
                        <div className="jumbotron">
                            <PrivateRoute exact path="/" component={FilesPage}/>
                            {/*<Route path="/file/:id" component={FilePage} />*/}
                            <Route path="/run/:id" component={StartRun}/>
                            <Route path="/login" component={LoginPage}/>
                            <Route path="/pipelines" component={ConnectedPipelinePage}/>
                            <Route path="/runs" component={RunsPage}/>
                            {/*<NotFoundRoute component={Unauthorized} />*/}
                        </div>
                    </div>
                </Router>

            </Provider>
        )
    }
}

render(<AppContainer />, document.getElementById('app'));

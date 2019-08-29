import React from 'react';
import { Router, Route, Link, NotFoundRoute } from 'react-router-dom';

import { history } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { FilesPage } from '@/Files';
import { FilePage } from '@/Files';
import { LoginPage } from '@/LoginPage';
import { PipelinePage } from '@/PipelinePage';
import { StartRun } from '@/Run'
import { RunsPage } from '@/Run'

import './App.css';
import mskLogo from '../public/MSKCC-logo.jpg';
import { Unauthorized } from '@/Unauthorized';

class App extends React.Component {
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
        var email = ""
        if (currentUser) {
            email = currentUser.user.email
        }
        return (
            <div>
            <header className="header">
                    <img src={mskLogo} className="logo"/> 
                    <div className="title">Voyager</div>
            </header>
            <Router history={history}>
                <div>
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <ul className="navbar-nav">
                                <li className="pull-left"><Link to="/" className="nav-item nav-link">Files</Link></li>
                                <li className="pull-left"><Link to="/pipelines" className="nav-item nav-link">Pipelines</Link></li>
                                <li className="pull-left"><Link to="/runs" className="nav-item nav-link">Runs</Link></li>
                                <li className="pull-left"><a onClick={this.logout} className="nav-item nav-link">Logout</a></li>
                                <li className="pull-right"><p className="nav-item nav-link pull-right">{email}</p></li>
                            </ul>
                        </nav>
                    }
                    <div className="jumbotron">
                            <PrivateRoute exact path="/" component={FilesPage} />
                            <Route path="/file/:id" component={FilePage} />
                            <Route path="/run/:id" component={StartRun} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/pipelines" component={PipelinePage} />
                            <Route path="/runs" component={RunsPage} />
                            {/* <NotFoundRoute component={Unauthorized} /> */}
                    </div>
                </div>
            </Router>
            </div>
        );
    }
}

export { App }; 
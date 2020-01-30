import React from 'react';

import '@/App/App.css';
import * as appActions from './AppActions'

import { bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';


const mapStateToProps = function(state) {
    return {}
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(appActions, dispatch)
};


class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    logout() {
        // authenticationService.logout();
        // history.push('/login');
    }

    render() {
        return (
            <div id="app__container">
                { this.props.children }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
import React from "react"
import { bindActionCreators } from 'redux';
import { connect } from "react-redux"

//import CircularProgress from 'material-ui/CircularProgress';

//import FilesList from "FilesList";

import * as filesPageActions from "./FilesPageActions";


const mapStateToProps = function (state) {
    return {
        files_list: state.filesPageReducer.files_list,
    }
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(filesPageActions, dispatch);
};


class FilesPageRedux extends React.Component {

    componentDidMount() {
        if (this.props.initial_patient_data && !this.props.patient_info) {
            this.props.loadFilesList();
        }
    }

    render() {

        return (
            <div class="files-page__container">
                <div class="files-page__header">files page</div>
                <FilesList />
            </div>
        )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesPageRedux)
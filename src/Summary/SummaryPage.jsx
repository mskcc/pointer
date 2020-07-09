import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TableFooter from '@material-ui/core/TableFooter';

import { summaryService, authenticationService } from '@/_services';

class SummaryPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            currentUser: authenticationService.currentUserValue,
            summary: {
            }
        };
    }

    componentDidMount() {
        this.loadPage();
    }

    loadPage() {
        summaryService.handleGetSummaryInfo().then(summary => this.setState({ summary }));
    }

    render() {
        const { summary } = this.state
        return (
            <div>
                <Paper>
                    <p>Total Requests: {summary.numRequests} </p>
                    <p>Total Samples: {summary.numSamples} </p>
                    <p>Total Argos Requests: {summary.argosRequests} </p>
                    <p>Total Argos Samples: {summary.argosSamples} </p>
                    <p>Total Pooled Normals: {summary.numPooledNormals} </p>
                    <p>Total DMP Bams: {summary.numDmpBams} </p>
                </Paper>
            </div>
        )
    }

}

export { SummaryPage };
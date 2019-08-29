import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TableFooter from '@material-ui/core/TableFooter';

import { runService, authenticationService } from '@/_services';


class RunsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            currentUser: authenticationService.currentUserValue,
            runs: {
                "results" : [],
                "previous": null,
                "next": null,
                "count": 0
            }
        }
        this.loadPage = this.loadPage.bind(this);
    }

    componentDidMount() {
        this.loadPage();
    }

    loadPage() {
        runService.getRuns().then(runs => this.setState({runs}));
    }

    editRun(event) {
        this.props.history.push("/run/" + event)
    }

    nextPage(event) {
        this.state.currentPage = this.state.currentPage + 1;
        this.loadPage(this.state.currentPage)
    }

    previousPage(event) {
        this.state.currentPage = this.state.currentPage - 1;
        this.loadPage(this.state.currentPage)
    }

    render() {
        const { runs } = this.state
        return (
            <div>
                <Paper>
                    <Table className="table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">RunId</TableCell>
                                <TableCell align="left">Run Name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="left">Created at</TableCell>
                                <TableCell align="left">Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {runs.results.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        {row.id}
                                    </TableCell>
                                    <TableCell>
                                        {row.name}
                                    </TableCell>
                                    <TableCell>
                                        {row.status}
                                    </TableCell>
                                    <TableCell>
                                        {row.created_date}
                                    </TableCell>
                                    <TableCell>
                                    <Button variant="contained" disabled={row.status != "CREATING"} onClick={() => this.editRun(row.id)}>Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell>
                                <Button align="center" variant="contained" disabled={runs.previous == null} onClick={this.previousPage}>
                                    Previous
                                </Button>
                                </TableCell>
                                <TableCell align="center">
                                    Page: {this.state.currentPage}
                                </TableCell>
                                <TableCell align="right">
                                <Button variant="contained" disabled={runs.next == null} onClick={this.nextPage}>
                                    Next
                                </Button>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Paper>
            </div>
        );
    }

}

export { RunsPage }; 